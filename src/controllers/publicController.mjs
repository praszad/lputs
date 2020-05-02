import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
const bcryptSaltRounds = 10;

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

    // const isVal = await validatePasswordHash('SilverSha', userReq.password);
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
      res.status(201).send(resp);
    }
  } catch (error) {
    res.status(200).send(error);
  }
}
async function generatePasswordHash(password = '') {
  const hashedPhrase = await bcrypt.hash(password, bcryptSaltRounds);
  return hashedPhrase;
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
