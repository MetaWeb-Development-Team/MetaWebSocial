import modelFile from "../models/fileModel";
import { FileRequestBody } from "../interfaces/FileRequestBody";

export async function saveNewFile(data: FileRequestBody) {
   if (!data.filename || !data.filedata) {
      throw new Error("Missing required fields: filename, filedata");
   }

   const newFile = {
      filename: data.filename,
      filedata: data.filedata,
   };

   return await modelFile.create(newFile);
}

export async function getAllFiles() {
   const files = await modelFile.find({});
   return {
      count: files.length,
      data: files,
   };
}

export async function getFileById(id: string) {
   const file = await modelFile.findById(id);
   if (!file) {
      throw new Error("File not found");
   }
   return file;
}

export async function updateFileById(id: string, data: FileRequestBody) {
   if (!data.filename || !data.filedata) {
      throw new Error("Missing required fields: filename, filedata");
   }

   const result = await modelFile.findByIdAndUpdate(id, data);
   if (!result) {
      throw new Error("File not found");
   }

   return { message: "File updated successfully" };
}

export async function deleteFileById(id: string) {
   const result = await modelFile.findByIdAndDelete(id);
   if (!result) {
      throw new Error("File not found");
   }

   return { message: "File deleted successfully" };
}
