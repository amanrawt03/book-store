import dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the very top
// console.log(process.env.MONGO_URI)
import express from 'express';
import configMongoDb from './mongoConfig.js';
import authRoutes from './routes/authRoutes.js'
const app = express();
app.use(express.json())
configMongoDb(); // Initialize DB connection

app.use('/api/auth', authRoutes)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
