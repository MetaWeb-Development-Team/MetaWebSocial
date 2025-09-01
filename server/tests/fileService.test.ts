import mongoose from "mongoose";
import modelFile from "../models/fileModel";
import {
   saveNewFile,
   getAllFiles,
   getFileById,
   updateFileById,
   deleteFileById,
} from "../services/fileService";

const mockData = {
   filename: "test.txt",
   filedata: "This is test content.",
};

interface FileDoc {
   _id: mongoose.Types.ObjectId;
   filename: string;
   filedata: string;
}

let createdFileId: string;

beforeAll(async () => {
   await mongoose.connect("Set-your-own-MongoDB-URI-To-Do-The-Test"); // ✅ make sure MongoDB is running
   await modelFile.deleteMany(); // clear collection before test
});

afterAll(async () => {
   await modelFile.deleteMany(); // cleanup
   await mongoose.disconnect();
});

describe("fileService", () => {
   test("should create a new file", async () => {
      const result = (await saveNewFile(mockData)) as FileDoc;
      expect(result).toHaveProperty("_id");
      expect(result.filename).toBe(mockData.filename);
      createdFileId = result._id.toString();
   });

   test("should get all files", async () => {
      const result = await getAllFiles();
      expect(result.count).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty("filename");
   });

   test("should get file by ID", async () => {
      const result = (await getFileById(createdFileId)) as FileDoc;
      expect(result.filename).toBe(mockData.filename);
   });

   test("should update a file by ID", async () => {
      const updatedData = {
         filename: "updated.txt",
         filedata: "Updated content",
      };
      const result = await updateFileById(createdFileId, updatedData);
      expect(result).toEqual({ message: "File updated successfully" });

      const updatedFile = (await getFileById(createdFileId)) as FileDoc;
      expect(updatedFile.filename).toBe("updated.txt");
   });

   test("should delete a file by ID", async () => {
      const result = await deleteFileById(createdFileId);
      expect(result).toEqual({ message: "File deleted successfully" });

      await expect(getFileById(createdFileId)).rejects.toThrow(
         "File not found",
      );
   });
});
