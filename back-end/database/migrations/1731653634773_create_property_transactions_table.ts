import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PropertyTransactions extends BaseSchema {
  protected tableName = 'property_transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('parcel_id').references('parcel_id').inTable('parcels')
      table.integer('old_owner_id').unsigned().references('user_gid').inTable('users')
      table.integer('new_owner_id').unsigned().references('user_gid').inTable('users')
      table.float('area_of_parcel').notNullable()
      table.decimal('purchase_amount', 10, 2).notNullable()
      table.json('parent_parcel_ids')
      table.json('child_parcel_ids')
      table.date('payment_date').notNullable()
      table.date('registry_date').notNullable()
      table.integer('verified_by_officer_id').unsigned().references('user_gid').inTable('users')
      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_available_for_sale').defaultTo(false)
      table.decimal('sale_amount', 10, 2)
      table.integer('interested_buyer').unsigned().references('user_gid').inTable('users')
      table.json('reference_documents')
      table.integer('modified_by').unsigned().references('user_gid').inTable('users')
      table.integer('action').unsigned().references('id').inTable('m_actions')
      table.datetime('modified_date', { useTz: true })
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}