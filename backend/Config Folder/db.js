import mongoose from "mongoose";
// dotenv is loaded once from `index.js` to centralize config loading

const connectDB = async () => {
  const envUri = process.env.MONGO_URI;
  const fallback = "mongodb://127.0.0.1:27017/job-website"; // local fallback
  const uri = envUri && envUri.length > 0 ? envUri : fallback;

  if (!envUri) {
    console.warn(
      "⚠️  MONGO_URI not set — using local fallback. If you intended to use MongoDB Atlas, set MONGO_URI in your .env file."
    );
  }

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);

    // Provide actionable tips for common SRV/DNS failures
    if (error.message && error.message.includes("querySrv")) {
      console.error(`\nDNS SRV lookup failed for a mongodb+srv URI. Common fixes:\n` +
        ` - Ensure your network/DNS resolver can resolve SRV records (try 8.8.8.8).\n` +
        ` - In Atlas, click 'Connect' -> 'Connect your application' and copy the connection string; it may include the DB name and options.\n` +
        ` - If SRV lookups are blocked, use the standard (non-+srv) connection string that lists hostnames and ports.\n`
      );
    }

    // Do not exit automatically so developers can read messages during local development.
    // If you want the process to exit on DB failure in production, set FORCE_EXIT_ON_DB_ERROR=true
    if (process.env.FORCE_EXIT_ON_DB_ERROR === 'true') {
      process.exit(1);
    }
  }
};

export default connectDB;
