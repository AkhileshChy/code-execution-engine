import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDatabase.js";
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
    connectDB();
})