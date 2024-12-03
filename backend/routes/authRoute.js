import express from 'express'
const router= express.Router()
import {loginFn, signupFn} from '../controllers/authController.js'

router.post('/login', loginFn)
router.post('/signup', signupFn)

export default router