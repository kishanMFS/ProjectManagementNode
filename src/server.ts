import express from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;

const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
