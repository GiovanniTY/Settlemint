import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateUsersTable extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('InnoDB')  // Imposta il motore del database su InnoDB
      table.increments('id').primary()

      // Imposta user_gid come unsigned per garantire la corrispondenza con modified_by in parcels
      table.integer('user_gid').unsigned().unique().notNullable().index()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.string('mobile_no').notNullable()
      table.integer('identification_type').unsigned()
      table.string('identification_no').notNullable()
      table.string('name').notNullable()
      table.date('dob').notNullable()
      table.integer('gender').unsigned()
      table.integer('nationality').unsigned()
      table.integer('role').unsigned()
      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.integer('modified_by').unsigned()
      table.string('identification_document')
      table.datetime('created_at', { useTz: true }).notNullable()
      table.datetime('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}