import mongoose from 'mongoose';

const userScheme = mongoose.Schema({
  _id: String,
  username: String,
  email: String,
  password: String,
  mobile: String,
  links: Object,
});

const User = mongoose.model('users', userScheme);

export default User;
