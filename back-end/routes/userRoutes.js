import express from 'express'
const router = express.Router()

import {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUserPassword,
} from '../controllers/userController.js'
import {
    authenticateUser,
    authorizePermissions,
} from '../midlleware/authentication.js'

router
    .route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllUsers)

router
    .route('/update-user')
    .patch(authenticateUser, updateUser)

router
    .route('/update-user-password')
    .patch(authenticateUser, updateUserPassword)

router
    .route('/:id')
    .get(authenticateUser, getSingleUser)
    

export default router