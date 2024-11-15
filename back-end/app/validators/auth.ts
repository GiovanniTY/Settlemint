// app/validators/auth.ts
import vine from '@vinejs/vine'

const password = vine.string().minLength(6)

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
    mobile_no: vine.string().trim().minLength(10),
    identification_type: vine.number().positive(),
    identification_no: vine.string().trim(),
    dob: vine.date(),
    gender: vine.number().positive(),
    nationality: vine.number().positive(),
    role: vine.number().positive(),
    identification_document: vine.string().optional()
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail().optional(),
    mobile_no: vine.string().trim().minLength(10).optional(),
    is_verified: vine.boolean().optional(),
    is_active: vine.boolean().optional(),
  })
)