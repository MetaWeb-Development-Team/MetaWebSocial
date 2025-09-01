import mongoose, { Schema, Model } from "mongoose";
import { IFile } from "../Interfaces/IFile";

const fileSchema: Schema<IFile> = new Schema(
   {
      filename: {
         type: String,
         required: true,
      },
      filedata: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

const modelFile: Model<IFile> = mongoose.model<IFile>("Filename", fileSchema);

export default modelFile;
