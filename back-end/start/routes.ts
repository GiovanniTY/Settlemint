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
const ParcelsController = () => import('#controllers/parcels_controller')

// User Management APIs
router.post('/users/register', [AuthController, 'register']).as('auth.register')
router.post('/users/login', [AuthController, 'login']).as('auth.login')
router.get('/users/:id', [AuthController, 'getUser']).as('users.get').use(middleware.auth())
router.put('/users/:id', [AuthController, 'updateUser']).as('users.update').use(middleware.auth())
router.delete('/users/:id', [AuthController, 'deactivateUser']).as('users.deactivate').use(middleware.auth())
router.post('/users/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/users/me', [AuthController, 'me']).as('auth.me').use(middleware.auth())

// Parcel Management APIs
router.post('/parcels/register', [ParcelsController, 'register']).as('parcels.register').use(middleware.auth())
router.get('/parcels/:id', [ParcelsController, 'show']).as('parcels.show').use(middleware.auth())
router.get('/parcels/available', [ParcelsController, 'available']).as('parcels.available').use(middleware.auth())
router.put('/parcels/:id', [ParcelsController, 'update']).as('parcels.update').use(middleware.auth())
router.post('/parcels/split', [ParcelsController, 'split']).as('parcels.split').use(middleware.auth())
router.post('/parcels/merge', [ParcelsController, 'merge']).as('parcels.merge').use(middleware.auth())