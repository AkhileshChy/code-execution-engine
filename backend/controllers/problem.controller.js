import Problem from "../models/problem.model.js";

export const createProblem = async (req, res) => {
    try {
        const {title, description, difficulty, inputFormat, outputFormat, constraints, examples, testCases, tags} = req.body;
        const existingProblem = await Problem.findOne({ title });
        if (existingProblem) {
            return res.status(400).json({ success: false, message: "Problem title already exists" });
        }
        const lastProblem = await Problem.findOne({}).sort({ problemNumber: -1 }).exec();
        const newProblemNumber = lastProblem ? lastProblem + 1 : 1;
        const newProblem = new Problem({
            problemNumber: newProblemNumber,
            title,
            description,
            difficulty,
            inputFormat,
            outputFormat,
            constraints,
            examples,
            testCases,
            tags,
            createdBy: req.user_id
        });
        if (newProblem){
            await newProblem.save();
            res.status(201).json({ success: true, problem: newProblem });
        }
    } catch (error) {
        console.error("Error in create problem controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}