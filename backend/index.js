import dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the very top
// console.log(process.env.MONGO_URI)
import express from 'express';
import configMongoDb from './mongoConfig.js';

const app = express();

configMongoDb(); // Initialize DB connection

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
