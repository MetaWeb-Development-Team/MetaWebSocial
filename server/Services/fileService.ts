import modelFile from "../models/fileModel"; // adjust import path as needed
import { FileRequestBody } from "../interfaces/FileRequestBody";

export async function saveNewFile(data: FileRequestBody) {
   if (!data.filename || !data.filedata) {
      throw new Error(
         "Data received was incomplete. Data Addition Cancelled. Send all required fields: filename, filedata",
      );
   }

   const newFile = {
      filename: data.filename,
      filedata: data.filedata,
   };

   const newfile = await modelFile.create(newFile);
   return newfile;
}
