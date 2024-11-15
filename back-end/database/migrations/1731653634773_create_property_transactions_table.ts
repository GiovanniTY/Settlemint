import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreatePropertyTransactionsTable extends BaseSchema {
  protected tableName = 'property_transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('parcel_id').references('parcel_id').inTable('parcels')
      table.string('old_owner_id').references('user_gid').inTable('users').onDelete('SET NULL')
      table.string('new_owner_id').references('user_gid').inTable('users').onDelete('SET NULL')
      table.float('area_of_parcel').notNullable()
      table.decimal('purchase_amount', 10, 2).notNullable()
      table.json('parent_parcel_ids')
      table.json('child_parcel_ids')
      table.date('payment_date').notNullable()
      table.date('registry_date').notNullable()
      table.string('verified_by_officer_id').references('user_gid').inTable('users').onDelete('SET NULL')
      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_available_for_sale').defaultTo(false)
      table.decimal('sale_amount', 10, 2)
      table.string('interested_buyer').references('user_gid').inTable('users').onDelete('SET NULL')
      table.json('reference_documents')
      table.string('modified_by').references('user_gid').inTable('users').onDelete('SET NULL')
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