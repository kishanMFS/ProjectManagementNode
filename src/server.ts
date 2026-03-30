import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.js';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const [unexpectedRequest, addErrorToRequestLog, globalErrorHandler] = errorHandler();
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

// Error handling middleware
app.use(unexpectedRequest);
app.use(addErrorToRequestLog);
app.use(globalErrorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
