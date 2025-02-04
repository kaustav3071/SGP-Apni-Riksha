const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL),
        console.log("✅ Database connected successfully 🚀🚀🚀");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1); // Exit process if connection fails
    }
}

module.exports = connectDB;
