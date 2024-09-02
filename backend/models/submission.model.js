import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem',
            required: true
        },
        code: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true,
            enum: ['JavaScript', 'Python', 'C++', 'Java', 'Ruby', 'Go']
        },
        status: {
            type: String,
            enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Compile Error', 'Time Limit Exceeded'],
            required: true
        },
        executionTime: {
            type: Number
        },
        memoryUsage: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;