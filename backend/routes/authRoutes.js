import express from 'express'
const router= express.Router()
import {loginFn, signupFn} from '../controllers/authController.js'
import protectRoute from '../middleware/auth.js'
router.post('/login', loginFn)
router.post('/signup', signupFn)
router.get('/protect',protectRoute, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
  })
export default router