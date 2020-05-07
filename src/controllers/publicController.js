import User from '../models/User.js';
import Categories from '../models/Categories.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const bcryptSaltRounds = 10;
export async function newToken(data) {
  return await jwt.sign({ data }, 'SILVER', { expiresIn: '1d' });
}

export async function refreshToken(data) {
  return await jwt.sign({ data }, 'SILVER', { expiresIn: '2d' });
}

export async function verifyToken(token) {
  return await jwt.verify(token, 'SILVER');
}

export async function signupUser(req, res) {
  const userId = await generateUserId();
  let userReq = req.body;
  try {
    userReq['_id'] = userId;
    userReq.password = await generatePasswordHash(userReq.password);
    let anyUser = await User.find({ username: userReq.username });
    if (!anyUser.length) {
      let resp = await User.create(userReq);
      res.status(200).send(resp);
    }
    res.status(200).send('User Already Exists');
  } catch (error) {
    res.status(200).send(error);
  }
}

export async function loginUser(req, res) {
  let userReq = req.body;
  try {
    let resp = await User.find({ username: userReq.username }).limit(1);
    const isVal = await validatePasswordHash(
      userReq.password,
      resp[0].password
    );

    if (isVal) {
      let userToken = await newToken(resp[0]);
      let userRefToken = await refreshToken(resp[0]);
      res.status(201).send({ data: { userToken, userRefToken } });
    }
  } catch (error) {
    res.status(200).send(error);
  }
}
async function generatePasswordHash(password = '') {
  const hashedPhrase = await bcrypt.hash(password, bcryptSaltRounds);
  return hashedPhrase;
}
export async function fetchCategories(req, res) {
  let categories = await Categories.find({});
  res.status(200).send(categories);
}
export async function addCategories(req, res) {
  try {
    let cat = req.body;
    cat.cat_id = await generateCatId();
    let categories = await Categories.create(cat);
    res.status(200).send(categories);
  } catch (error) {
    res.status(204).send({ error });
  }
}
async function validatePasswordHash(userPassword = '', dbPassword = '') {
  return await bcrypt.compare(userPassword, dbPassword);
}
async function generateUserId() {
  const results = await User.find({}).sort({ _id: -1 }).limit(1);
  try {
    if (results.length) {
      const lastIndexId = results[0]['_id'].split('_');
      const userId = (parseInt(lastIndexId[1]) + 1).toString().padStart(6, '0');
      return 'user_' + userId;
    } else {
      return 'user_000001';
    }
  } catch (error) {
    res.send(error);
  }
}

async function generateCatId() {
  const results = await Categories.find({}).sort({ cat_id: -1 }).limit(1);
  try {
    if (results.length) {
      const lastIndexId = results[0]['cat_id'].split('_');
      const catId = (parseInt(lastIndexId[1]) + 1).toString().padStart(11, '0');
      return 'cat_' + catId;
    } else {
      return 'cat_00000000001';
    }
  } catch (error) {
    res.send(error);
  }
}
