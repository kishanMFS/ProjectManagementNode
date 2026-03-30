import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import env from './config/env';
import errorHandler from './middleware/errorHandler';

const [unexpectedRequest, addErrorToRequestLog, globalErrorHandler] = errorHandler();
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';

const app: express.Application = express();
const PORT: string | number = env.PORT;
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
