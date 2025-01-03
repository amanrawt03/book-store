import e from 'express'
const router = e.Router()
import { requestOTP, confirmOTP , createOrder, getOrderDetails} from '../controllers/cartController.js'
router.post('/requestOTP', requestOTP)
router.post('/confirmOTP', confirmOTP)   
router.post('/createOrder', createOrder)   
router.get('/orderDetails/:orderId', getOrderDetails)   

export default router