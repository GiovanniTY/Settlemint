import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateParcelsTable extends BaseSchema {
  protected tableName = 'parcels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('InnoDB')  
      table.increments('id').primary()
      table.string('parcel_id').unique().notNullable()
      table.float('area_of_parcel').notNullable()
      table.json('parent_parcel_ids')
      table.json('child_parcel_ids')
      table.boolean('is_active').defaultTo(true)

      table.integer('modified_by').unsigned().nullable()
      table.foreign('modified_by').references('user_gid').inTable('users').onDelete('SET NULL')

      table.integer('property_action').unsigned().references('id').inTable('m_parcel_actions').onDelete('SET NULL')
      table.datetime('modified_date', { useTz: true })
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}