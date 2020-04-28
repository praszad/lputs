import express from 'express';
const router = express.Router();
import { sampleCheck } from '../controllers/publicController.mjs';
router.get('/demo', sampleCheck);
export default router;
