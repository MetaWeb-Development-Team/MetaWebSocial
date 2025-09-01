import { Router, Request, Response } from "express";
import { modelFile } from "../models/fileModel"; // adjust path as needed
import { FileRequestBody } from "../interfaces/FileRequestBody";

const router = Router();

// Create new file (POST)
router.post(
   "/",
   async (req: Request<{}, {}, FileRequestBody>, res: Response) => {
      try {
         if (!req.body.filename || !req.body.filedata) {
            return res.status(400).send({
               message:
                  "Data received was incomplete. Data Addition Cancelled. Send all required fields: filename, filedata",
            });
         }

         const newFile = {
            filename: req.body.filename,
            filedata: req.body.filedata,
         };

         const createdFile = await modelFile.create(newFile);

         return res.status(201).send(createdFile);
      } catch (err: any) {
         console.log(err.message);
         res.status(500).send({ message: err.message });
      }
   },
);

// Get all files (GET)
router.get("/", async (req: Request, res: Response) => {
   try {
      const listFiles = await modelFile.find({});
      return res.status(200).json({
         count: listFiles.length,
         data: listFiles,
      });
   } catch (err: any) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
   }
});

// Get file by ID (GET)
router.get("/:id", async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const file = await modelFile.findById(id);
      if (!file) {
         return res.status(404).json({ message: "File not found" });
      }
      return res.status(200).json(file);
   } catch (err: any) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
   }
});

// Update file by ID (PUT)
router.put(
   "/:id",
   async (req: Request<{ id: string }, {}, FileRequestBody>, res: Response) => {
      try {
         if (!req.body.filename || !req.body.filedata) {
            return res.status(400).send({
               message:
                  "Data received was incomplete. Data Replacement Cancelled. Send all required fields: filename, filedata",
            });
         }

         const { id } = req.params;
         const result = await modelFile.findByIdAndUpdate(id, req.body);

         if (!result) {
            return res.status(404).json({ message: "File not found" });
         }

         return res.status(200).send({ message: "File updated successfully" });
      } catch (err: any) {
         console.log(err.message);
         res.status(500).send({ message: err.message });
      }
   },
);

// Delete file by ID (DELETE)
router.delete("/:id", async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const result = await modelFile.findByIdAndDelete(id);

      if (!result) {
         return res.status(404).json({ message: "File not found" });
      }

      return res.status(200).json({ message: "File deleted successfully" });
   } catch (err: any) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
   }
});

export default router;
