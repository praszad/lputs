import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
const bcryptSaltRounds = 10;

export async function sampleCheck(req, res) {
  const userId = await generateUserId();
  let userReq = req.body;
  try {
    userReq['_id'] = userId;
    userReq.password = await generatePasswordHash(userReq.password);
    let resp = await User.create(userReq);
    // const isVal = await validatePasswordHash('SilverSha', userReq.password);
    res.status(200).send(resp);
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
