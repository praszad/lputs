import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import { publicRouter } from './routers/index.mjs';
const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(bodyParser.json());

function startApp() {
  app.listen(PORT, () => {
    console.log('connection will be  d soon ha established', PORT);
  });
}
app.use('/test', publicRouter);

export default startApp;
