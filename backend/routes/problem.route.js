import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createProblem, getAllProblems, getProblemByNumber } from "../controllers/problem.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createProblem);
router.get("/", getAllProblems);
router.get("/:problemNumber", getProblemByNumber);

export default router;
