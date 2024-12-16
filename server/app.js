// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors" ;
import cpuRoutes from "./routes/cpuRoutes.js";
import { PORT } from "./constants.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", cpuRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
