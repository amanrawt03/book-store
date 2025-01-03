import express from 'express'
const router= express.Router()
import {loginFn, signupFn, checkAddress, addAddress} from '../controllers/authController.js'

router.post('/login', loginFn)
router.post('/signup', signupFn)
router.post('/checkAddress', checkAddress)
router.post('/addAddress', addAddress)


export default router