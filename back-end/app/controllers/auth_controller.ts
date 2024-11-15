import User from '#models/user'
import { loginValidator, registerValidator, updateUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class AuthController {
  // User registration
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    // Log the registration data
    console.log('Registration data:', data);

    // Prepare user data
    const userData: Partial<User> = {
      ...data,
      role: data.role,
      dob: data.dob ? DateTime.fromJSDate(data.dob) : null,
    };

    // Create a new user with the received data
    const user = await User.create(userData);

    // Log the created user
    console.log('User created:', user);

    // Create an access token for the user
    const token = await User.accessTokens.create(user)

    return { user, token };
  }

  // User login
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    // Verify credentials
    const user = await User.verifyCredentials(email, password)

    // Create an access token for the user
    const token = await User.accessTokens.create(user)
    return { user, token, role: user.role };
  }

  // Get user details
  async getUser({ params, auth }: HttpContext) {
    await auth.check()
    const user = await User.findOrFail(params.id)
    return { user }
  }

  // Update user details
  async updateUser({ request, params, auth }: HttpContext) {
    await auth.check()
    const user = await User.findOrFail(params.id)
    const data = await request.validateUsing(updateUserValidator)
    user.merge(data)
    await user.save()
    return { user, message: 'User updated successfully' }
  }

  // Deactivate user
  async deactivateUser({ params, auth }: HttpContext) {
    await auth.check()
    const user = await User.findOrFail(params.id)
    user.is_active = false
    await user.save()
    return { message: 'User deactivated successfully' }
  }

  // User logout
  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'Logged out successfully' }
  }

  // Get current user
  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}