import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
   try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log("Connection to DB established");
   } catch (err) {
      console.error("Failed to connect to DB", err);
      throw err;
   }
};
