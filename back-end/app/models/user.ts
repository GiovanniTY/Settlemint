import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeSave, hasMany, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_gid: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare remember_me_token: string | null

  @column()
  declare mobile_no: string

  @column()
  declare identification_type: number

  @column()
  declare identification_no: string

  @column()
  declare name: string

  @column.date()
  declare dob: DateTime | null

  @column()
  declare gender: number

  @column()
  declare nationality: number

  @column()
  declare role: number

  @column()
  declare is_verified: boolean

  @column()
  declare is_active: boolean

  @column()
  declare modified_by: number

  @column()
  declare identification_document: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUserGid(user: User) {
    user.user_gid = randomUUID()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  // Relazioni
  @belongsTo(() => User, {
    foreignKey: 'modified_by',
  })
  declare modifier: BelongsTo<typeof User>

  @hasMany(() => User, {
    foreignKey: 'modified_by',
  })
  declare modifiedUsers: HasMany<typeof User>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  });
}