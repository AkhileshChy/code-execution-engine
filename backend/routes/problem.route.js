import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createProblem } from "../controllers/problem.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createProblem);

export default router;
