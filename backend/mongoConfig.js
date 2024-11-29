import mongoose from "mongoose";
const configMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,
      console.log("Database connected"));
  } catch (error) {
    console.log(`Could not connect to  database: ${error.message}`)
  }
};
export default configMongoDb;
