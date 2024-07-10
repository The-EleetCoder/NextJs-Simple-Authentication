import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connection established");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error : " + err);
      process.exit();
    });
  } catch (e) {
    console.log("Error connecting to Database : ", e);
    process.exit(1);
  }
}
