import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        solvedProblems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Problem',
                default: []
            }
        ],
        submissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Submission',
                default: []
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);

export default User;