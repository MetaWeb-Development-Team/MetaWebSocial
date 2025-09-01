import { Router, Request, Response } from "express";
import { FileRequestBody } from "../interfaces/FileRequestBody";
import {
   saveNewFile,
   getAllFiles,
   getFileById,
   updateFileById,
   deleteFileById,
} from "../services/fileService";

const router = Router();

// Create new file (POST)
router.post(
   "/",
   async (req: Request<{}, {}, FileRequestBody>, res: Response) => {
      try {
         const createdFile = await saveNewFile(req.body);
         return res.status(201).json(createdFile);
      } catch (err: any) {
         console.log(err.message);
         res.status(400).json({ message: err.message });
      }
   },
);

// Get all files (GET)
router.get("/", async (req: Request, res: Response) => {
   try {
      const files = await getAllFiles();
      return res.status(200).json(files);
   } catch (err: any) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
   }
});

// Get file by ID (GET)
router.get("/:id", async (req: Request, res: Response) => {
   try {
      const file = await getFileById(req.params.id);
      return res.status(200).json(file);
   } catch (err: any) {
      console.log(err.message);
      res.status(404).json({ message: err.message });
   }
});

// Update file by ID (PUT)
router.put(
   "/:id",
   async (req: Request<{ id: string }, {}, FileRequestBody>, res: Response) => {
      try {
         const result = await updateFileById(req.params.id, req.body);
         return res.status(200).json(result);
      } catch (err: any) {
         console.log(err.message);
         res.status(400).json({ message: err.message });
      }
   },
);

// Delete file by ID (DELETE)
router.delete("/:id", async (req: Request, res: Response) => {
   try {
      const result = await deleteFileById(req.params.id);
      return res.status(200).json(result);
   } catch (err: any) {
      console.log(err.message);
      res.status(404).json({ message: err.message });
   }
});

export default router;
