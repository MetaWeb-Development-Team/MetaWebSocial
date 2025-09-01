import mongoose, { Document, Schema, Model } from "mongoose";

export interface IFile extends Document {
   filename: string;
   filedata: string;
   createdAt?: Date;
   updatedAt?: Date;
}

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

export const modelFile: Model<IFile> = mongoose.model<IFile>(
   "Filename",
   fileSchema,
);
