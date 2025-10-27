import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/job-website";
console.log(uri) 

  try {
    // Connect (mongoose 6+ doesn't require useNewUrlParser/useUnifiedTopology)
    const conn = await mongoose.connect(uri);
    // Avoid logging the full URI (it may contain the password). Log host only.
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
