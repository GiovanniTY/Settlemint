import { BaseSchema } from '@adonisjs/lucid/schema'

export default class MetadataTables extends BaseSchema {
  public async up() {
    // Identification Type Table
    this.schema.createTable('m_identification_type', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })

    // Gender Table
    this.schema.createTable('m_gender', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })

    // Nationality Table
    this.schema.createTable('m_nationality', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })

    // Role Table
    this.schema.createTable('m_role', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })

    // Actions Table
    this.schema.createTable('m_actions', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })

    // Parcel Actions Table
    this.schema.createTable('m_parcel_actions', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable('m_parcel_actions')
    this.schema.dropTable('m_actions')
    this.schema.dropTable('m_role')
    this.schema.dropTable('m_nationality')
    this.schema.dropTable('m_gender')
    this.schema.dropTable('m_identification_type')
  }
}