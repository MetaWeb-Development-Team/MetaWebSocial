import express from "express";
import  { modelFile } from '../models/fileModel.js';

const router = express.Router();

// route for save a new file in db
router.post('/', async (req, res) => {
    try {
        
        //check if the user has send the proper data specified
        if (!req.body.filename || !req.body.filedata) {
            return res.status(400).send({
                message: 'Data received was incomplete. Data Addition Cancelled. Send all required fields: filename, filedata',
            });
        }
        
        //make a new instance of the file using mongo schema
        const newFile = {
            filename: req.body.filename,
            filedata: req.body.filedata,
        };

        //send data and wait for confirmation
        const newfile = await modelFile.create(newFile);

        //return confirmation that data was received
        return res.status(201).send(newfile);

    } catch(err) {
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
});

// route for get all files from db
router.get('/', async (req, res) => {
    try {
        //search conditions in `{}`
        const listFiles = await modelFile.find({});

        return res.status(200).json({
            count:listFiles.length,
            data: listFiles
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// route to get file with given id
router.get('/:id', async (req, res) => {
    try {

        //obtain id from params within req
        const { id } = req.params;

        //find by given id
        const listFiles = await modelFile.findById(id);

        return res.status(200).json(listFiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// route to update data within the db
router.put('/:id', async (req, res) => {
    try {

        //check if the user has send the proper data specified
        if (!req.body.filename || !req.body.filedata) {
            return res.status(400).send({
                message: 'Data received was incomplete. Data Replacement Cancelled. Send all required fields: filename, filedata',
            });
        }

        const { id } = req.params;

        const result = await modelFile.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({message: 'File not found'});
        }

        return res.status(200).send({message: 'File updated successfully'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});


// delete a file by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await modelFile.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({message: 'File not found'});
        }

        return res.status(200).json({message: 'File deleted successfully'});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;