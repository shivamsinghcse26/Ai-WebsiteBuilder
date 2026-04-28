import express from 'express'
import { googleAuth, logoutUser, getCurrentUser } from '../controllers/authController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.post('/google', googleAuth)
router.get('/logout', logoutUser)
router.get('/me', isAuthenticated, getCurrentUser)

export default router