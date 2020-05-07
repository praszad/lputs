import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import { publicRouter } from './routers/index.js';
import { connectDb } from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(bodyParser.json());

function startApp() {
  app.listen(PORT, () => {
    console.log('App COnnected on port:', PORT);
    connectDb();
  });
}
const urlVersion = '/api/v1';
app.use(urlVersion, publicRouter);

export default startApp;
