import vine from '@vinejs/vine'

export const createParcelValidator = vine.compile(
  vine.object({
    area_of_parcel: vine.number().positive(),
    parent_parcel_ids: vine.array(vine.string()).optional(),
    child_parcel_ids: vine.array(vine.string()).optional(),
    is_active: vine.boolean(),
    is_available_for_sale: vine.boolean(),
    modified_by: vine.string(),
    property_action: vine.number().positive().optional(),
  })
)

export const updateParcelValidator = vine.compile(
  vine.object({
    area_of_parcel: vine.number().positive().optional(),
    is_active: vine.boolean().optional(),
    is_available_for_sale: vine.boolean().optional(),
    modified_by: vine.string().optional(),
    property_action: vine.number().positive().optional(),
  })
)

export const splitParcelValidator = vine.compile(
  vine.object({
    parent_parcel_id: vine.string(),
    new_parcels: vine.array(
      vine.object({
        area_of_parcel: vine.number().positive(),
      })
    ),
    modified_by: vine.string(),
  })
)

export const mergeParcelValidator = vine.compile(
  vine.object({
    parcel_ids: vine.array(vine.string()),
    new_parcel: vine.object({
      area_of_parcel: vine.number().positive(),
    }),
    modified_by: vine.string(),
  })
)