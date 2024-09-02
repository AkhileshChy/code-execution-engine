import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        problemNumber: {
            type: Number,
            unique: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            required: true
        },
        inputFormat: {
            type: String, 
            required: true
        },
        outputFormat: {
            type: String,
            required: true
        },
        constraints: {
            type: String,
            required: true 
        },
        examples: [
            {
                input: String,
                output: String
            }
        ],
        testCases: [
            {
                input: String,
                expectedOutput: String,
                explanation: String,
            }
        ],
        tags: [
            {
                type: String
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;