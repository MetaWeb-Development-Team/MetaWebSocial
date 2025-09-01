import { Document } from "mongoose";

export interface IFile extends Document {
   filename: string;
   filedata: string;
   createdAt?: Date;
   updatedAt?: Date;
}
