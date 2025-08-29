import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
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
    }
);

export const modelFile = mongoose.model('Filename', fileSchema);