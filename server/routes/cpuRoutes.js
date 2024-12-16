// routes/cpuRoutes.js
import express from "express";
import { getCPUUsage } from "../controllers/cpuController.js"; 
const router = express.Router();

router.post("/api/cpu-usage", getCPUUsage);

export default router; 
