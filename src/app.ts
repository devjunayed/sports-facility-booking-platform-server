import express, { Application } from 'express'
import router from './app/routes'
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

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

export default app
