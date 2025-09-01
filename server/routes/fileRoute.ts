import express, { Request, Response } from "express";
import { modelFile } from "../models/fileModel.js";

const router = express.Router();

interface FileRequestBody {
  filename: string;
  filedata: string;
}

// route for save a new file in db
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

      const newfile = await modelFile.create(newFile);

      return res.status(201).send(newfile);
    } catch (err: any) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },
);

// route for get all files from db
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

// route to get file with given id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listFiles = await modelFile.findById(id);

    return res.status(200).json(listFiles);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// route to update data within the db
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

// delete a file by id
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
