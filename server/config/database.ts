import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Unable to establish db connection", error.message);
  }

  const connection = mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("connected to database");
    return;
  }
  connection.on("error", () => console.log("Failed to connect"));
};

export default connectDB;