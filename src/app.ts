import express, { Application } from 'express'
import router from './app/routes'
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { notFound } from './app/middlewares/notFound';

// creating app
const app: Application = express()

// cors
app.use(cors());

// middlewares for getting data from the frontend
app.use(express.json());

// using routes
app.use('/api/', router);

// global error handler
app.use(globalErrorHandler);

// api not found
app.use(notFound);

export default app
