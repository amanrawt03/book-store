import {} from 'dotenv/config'
import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import configMongoDb from './config/mongoConfig.js';
import authRoutes from './routes/authRoute.js'
import bookRoutes from './routes/booksRoute.js'
import cartRoutes from './routes/cartRoutes.js'
import cors from 'cors'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))
configMongoDb(); // Initialize DB connection

app.use('/api/auth', authRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/cart', cartRoutes)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
