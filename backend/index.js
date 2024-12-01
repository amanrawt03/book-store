import dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the very top
// console.log(process.env.MONGO_URI)
import express from 'express';
import cookieParser from 'cookie-parser';
import configMongoDb from './mongoConfig.js';
import authRoutes from './routes/authRoute.js'
import bookRoutes from './routes/booksRoute.js'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))
configMongoDb(); // Initialize DB connection

app.use('/api/auth', authRoutes)
app.use('/api/book', bookRoutes)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
