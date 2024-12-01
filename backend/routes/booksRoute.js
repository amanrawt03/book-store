import express from 'express'
const router= express.Router()
import {getBooks} from '../controllers/booksController.js'

router.get('/getBooks', getBooks)
export default router