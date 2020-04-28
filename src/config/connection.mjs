import mongoose from 'mongoose';
const url = 'mongodb://localhost:27017/lputs';
export function connectDb() {
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        console.log('Db Connected on : ', url);
      } else console.log('Db Connection failed due to : ', { err });
    }
  );
}
