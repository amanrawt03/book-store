import express from 'express'
const router= express.Router()
import {getBooks, filterBooks} from '../controllers/booksController.js'

router.get('/getBooks', getBooks)
router.post('/filterBooks', filterBooks)
export default router