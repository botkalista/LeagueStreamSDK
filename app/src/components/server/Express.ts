
import express from 'express';
import cors from 'cors';
import { tRpcMiddleware } from './tRPC';

export const app = express();
app.use(cors());

app.use('/trpc', tRpcMiddleware);