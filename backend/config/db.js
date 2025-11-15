import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      tls: true,
      tlsInsecure: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

export default connectDB;
