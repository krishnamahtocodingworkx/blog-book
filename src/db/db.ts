import mongoose from "mongoose";

export async function dbConnect() {
  try {
    // Ensure mongoose is not reconnected on every request (optional but recommended for Next.js)
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB.");
      return;
    }

    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL!);

    // Set up event listeners for connection and error events
    mongoose.connection.on("connected", () => {
      console.log("DB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in DB connection:", err);
      process.exit(1); // Exit the process if MongoDB connection fails
    });
  } catch (error) {
    console.log(`Error in DB connection:`, error);
    process.exit(1); // Exit the process if an error occurs
  }
}
