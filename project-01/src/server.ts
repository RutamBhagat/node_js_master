import process from 'node:process';
import consola from 'consola';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { mw as requestIp } from 'request-ip';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { logger } from './utils/logger';
import { errorHandler, handle404Error } from '@/utils/errors';
import routes from '@/routes/routes';
import './utils/env';

// Swagger configuration

const { PORT } = process.env;
const app = express();

const options = {
  explorer: true,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(express.json());
app.use(cors());
app.use(requestIp());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
      consola.warn(`DDoS Attempt from ${req.ip}`);
      res.status(429).json({
        error: 'Too many requests in a short time. Please try in a minute.',
      });
    },
  }),
);
app.use(logger);

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the API!',
  });
});

app.get('/healthcheck', (_req, res) => {
  res.json({
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use('/api', routes);
app.all('*', handle404Error);
app.use(errorHandler);

app.listen(PORT, () => {
  consola.info(`Server running at http://localhost:${PORT}`);
  consola.info(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
