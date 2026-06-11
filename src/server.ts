import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import env from './config/env.js';
import errorHandler from '@/middleware/errorHandler.js';
import cookies from 'cookie-parser';

const [unexpectedRequest, addErrorToRequestLog, globalErrorHandler] = errorHandler();
import authRoutes from '@/routes/authRoutes.js';
import projectRoutes from '@/routes/projectRoutes.js';

const app: express.Application = express();
const PORT: string | number = env.PORT;
const httpServer = createServer(app);

app.use(
  cors({
    origin: 'http://localhost:5173', // Your exact frontend URL
    credentials: true, // Allows the browser to store cookies
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Error handling middleware
app.use(unexpectedRequest);
app.use(addErrorToRequestLog);
app.use(globalErrorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
