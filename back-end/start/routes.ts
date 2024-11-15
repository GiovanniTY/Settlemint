/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Base route
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const AuthController = () => import('#controllers/auth_controller')
// User Management APIs
router.post('/users/register', [AuthController, 'register']).as('auth.register')
router.post('/users/login', [AuthController, 'login']).as('auth.login')
router.get('/users/:id', [AuthController, 'getUser']).as('users.get').use(middleware.auth())
router.put('/users/:id', [AuthController, 'updateUser']).as('users.update').use(middleware.auth())
router.delete('/users/:id', [AuthController, 'deactivateUser']).as('users.deactivate').use(middleware.auth())
router.post('/users/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/users/me', [AuthController, 'me']).as('auth.me').use(middleware.auth())