import Problem from "../models/problem.model.js";

export const createProblem = async (req, res) => {
    try {
        const {title, description, difficulty, inputFormat, outputFormat, constraints, examples, testCases, tags} = req.body;
        const existingProblem = await Problem.findOne({ title });
        if (existingProblem) {
            return res.status(400).json({ success: false, message: "Problem title already exists" });
        }
        const lastProblem = await Problem.findOne({}).sort({ problemNumber: -1 });
        const newProblemNumber = lastProblem ? lastProblem.problemNumber + 1 : 1;
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

export const getAllProblems = async (req, res) => {
    try {
        const { difficulty, tags } = req.query;
        let query = {};
        if (difficulty) {
            query.difficulty = difficulty;
        }
        if (tags) {
            query.tags = tags;
        }
        const problems = await Problem.find(query);
        res.status(200).json({success: true, problems});
    } catch (error) {
        console.error("Error in getAllProblems controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getProblemByNumber = async (req, res) => {
    try {
        const problemNumber = req.params.problemNumber;
        const problem = await Problem.findOne({problemNumber});
        if (!problem) {
            return res.status(400).json({ success: false, message: "Problem not found" });
        }
        res.status(200).json({ success: true, problem});
    } catch (error) {
        console.log("Error in getProblemByNumber controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}