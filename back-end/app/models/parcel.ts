import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import ParcelAction from './parcel_action.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Parcel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare parcel_id: string

  @column()
  declare area_of_parcel: number

  @column()
  declare parent_parcel_ids: JSON

  @column()
  declare child_parcel_ids: JSON

  @column()
  declare is_active: boolean

  @column()
  declare modified_by: number | null

  @column()
  declare property_action: number | null

  @column.dateTime()
  declare modified_date: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'modified_by',
    localKey: 'user_gid',
  })
  declare modifier: BelongsTo<typeof User>

  @belongsTo(() => ParcelAction, {
    foreignKey: 'property_action',
  })
  declare action: BelongsTo<typeof ParcelAction>
}