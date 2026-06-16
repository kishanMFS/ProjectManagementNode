import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import env from './config/env.js';
import errorHandler from '../src/middleware/errorHandler.js';
import cookies from 'cookie-parser';
import helmet from 'helmet';

const [unexpectedRequest, addErrorToRequestLog, globalErrorHandler] = errorHandler();
import authRoutes from '../src/routes/authRoutes.js';
import projectRoutes from '../src/routes/projectRoutes.js';

import corsOptions from '../src/config/corsOptions.js';
import { apiRateLimiter, authRateLimiter } from '../src/middleware/rateLimiter.js';

const app: express.Application = express();
const PORT: string | number = env.PORT;
const httpServer = createServer(app);

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  }),
);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

// Global Rate Limiting
app.use('/api', apiRateLimiter);

// Routes
app.use('/api/auth', authRateLimiter, authRoutes);
app.use('/api/projects', projectRoutes);

// Error handling middleware
app.use(unexpectedRequest);
app.use(addErrorToRequestLog);
app.use(globalErrorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
