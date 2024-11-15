import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Parcel from './parcel.js'
import Action from './action.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PropertyTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare parcel_id: string

  @column()
  declare old_owner_id: number

  @column()
  declare new_owner_id: number

  @column()
  declare area_of_parcel: number

  @column()
  declare purchase_amount: number

  @column()
  declare parent_parcel_ids: JSON

  @column()
  declare child_parcel_ids: JSON

  @column.date()
  declare payment_date: DateTime

  @column.date()
  declare registry_date: DateTime

  @column()
  declare verified_by_officer_id: number

  @column()
  declare is_verified: boolean

  @column()
  declare is_active: boolean

  @column()
  declare is_available_for_sale: boolean

  @column()
  declare sale_amount: number | null

  @column()
  declare interested_buyer: number | null

  @column()
  declare reference_documents: JSON

  @column()
  declare modified_by: number

  @column()
  declare action: number

  @column.dateTime()
  declare modified_date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Parcel, {
    foreignKey: 'parcel_id',
    localKey: 'parcel_id',
  })
  declare parcel: BelongsTo<typeof Parcel>

  @belongsTo(() => User, {
    foreignKey: 'old_owner_id',
    localKey: 'user_gid',
  })
  declare oldOwner: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'new_owner_id',
    localKey: 'user_gid',
  })
  declare newOwner: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'verified_by_officer_id',
    localKey: 'user_gid',
  })
  declare verifiedByOfficer: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'interested_buyer',
    localKey: 'user_gid',
  })
  declare interestedBuyer: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'modified_by',
    localKey: 'user_gid',
  })
  declare modifier: BelongsTo<typeof User>

  @belongsTo(() => Action, {
    foreignKey: 'action',
  })
  declare transactionAction: BelongsTo<typeof Action>
}