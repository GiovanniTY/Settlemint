import type { HttpContext } from '@adonisjs/core/http'
import Parcel from '#models/parcel'
import { createParcelValidator, updateParcelValidator, splitParcelValidator, mergeParcelValidator } from '#validators/parcel_validator'

export default class ParcelsController {
  public async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createParcelValidator)
    const parcel = await Parcel.create(payload)
    return response.created(parcel)
  }

  public async show({ params, response }: HttpContext) {
    const parcel = await Parcel.findOrFail(params.id)
    return response.ok(parcel)
  }

  public async available({ response }: HttpContext) {
    const availableParcels = await Parcel.query().where('is_available_for_sale', true)
    return response.ok(availableParcels)
  }

  public async update({ params, request, response }: HttpContext) {
    const parcel = await Parcel.findOrFail(params.id)
    const payload = await request.validateUsing(updateParcelValidator)
    parcel.merge(payload)
    await parcel.save()
    return response.ok(parcel)
  }

  public async split({ request, response }: HttpContext) {
    const { parent_parcel_id, new_parcels, modified_by } = await request.validateUsing(splitParcelValidator)

    const parentParcel = await Parcel.findByOrFail('parcel_id', parent_parcel_id)
    
    if (new_parcels.reduce((sum, p) => sum + p.area_of_parcel, 0) !== parentParcel.area_of_parcel) {
      return response.badRequest('The sum of new parcel areas must equal the parent parcel area')
    }

    const childParcels = await Promise.all(new_parcels.map(async (newParcel) => {
      return await Parcel.create({
        ...newParcel,
        parent_parcel_ids: [parent_parcel_id],
        is_active: true,
        modified_by,
      })
    }))

    parentParcel.child_parcel_ids = childParcels.map(p => p.parcel_id)
    parentParcel.is_active = false
    await parentParcel.save()

    return response.ok({ parent: parentParcel, children: childParcels })
  }

  public async merge({ request, response }: HttpContext) {
    const { parcel_ids, new_parcel, modified_by } = await request.validateUsing(mergeParcelValidator)

    const parcelsToMerge = await Parcel.query().whereIn('parcel_id', parcel_ids)
    
    if (parcelsToMerge.length !== parcel_ids.length) {
      return response.badRequest('One or more parcel IDs are invalid')
    }

    if (new_parcel.area_of_parcel !== parcelsToMerge.reduce((sum, p) => sum + p.area_of_parcel, 0)) {
      return response.badRequest('The new parcel area must equal the sum of merged parcel areas')
    }

    const mergedParcel = await Parcel.create({
      ...new_parcel,
      parent_parcel_ids: parcel_ids,
      is_active: true,
      modified_by,
    })

    await Parcel.query().whereIn('parcel_id', parcel_ids).update({ 
      is_active: false, 
      child_parcel_ids: [mergedParcel.parcel_id] 
    })

    return response.ok(mergedParcel)
  }
}