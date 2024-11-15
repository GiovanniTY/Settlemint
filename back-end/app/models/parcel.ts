import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany, beforeCreate } from '@adonisjs/lucid/orm'
import User from './user.js'
import ParcelAction from './parcel_action.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'crypto'

export default class Parcel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare parcel_id: string

  @column()
  declare area_of_parcel: number

  @column({
    prepare: (value: string[] | null) => value ? JSON.stringify(value) : null,
    consume: (value: string | null) => value ? JSON.parse(value) : null,
  })
  declare parent_parcel_ids: string[] | null

  @column({
    prepare: (value: string[] | null) => value ? JSON.stringify(value) : null,
    consume: (value: string | null) => value ? JSON.parse(value) : null,
  })
  declare child_parcel_ids: string[] | null

  @column()
  declare is_active: boolean

  @column()
  declare is_available_for_sale: boolean

  @column()
  declare modified_by: string | null

  @column()
  declare property_action: number | null

  @column.dateTime()
  declare modified_date: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createParcelId(parcel: Parcel) {
    parcel.parcel_id = randomUUID()
  }

  @belongsTo(() => User, {
    foreignKey: 'modified_by',
    localKey: 'user_gid',
  })
  declare modifier: BelongsTo<typeof User>

  @belongsTo(() => ParcelAction, {
    foreignKey: 'property_action',
  })
  declare action: BelongsTo<typeof ParcelAction>

  @manyToMany(() => User, {
    pivotTable: 'property_transactions',
    pivotForeignKey: 'parcel_id',
    pivotRelatedForeignKey: 'new_owner_id',
  })
  declare owners: ManyToMany<typeof User>
}