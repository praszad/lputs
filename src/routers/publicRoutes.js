import express from 'express';
const router = express.Router();

import { updateUser } from '../controllers/userController.js';
import {
  signupUser,
  loginUser,
  fetchCategories,
  addCategories,
} from '../controllers/publicController.js';
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/category', addCategories);
router.get('/category', fetchCategories);

router.put('/user', updateUser);
export default router;
