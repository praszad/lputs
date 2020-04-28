import express from 'express';
const router = express.Router();
function dummyFunction(req, res) {
  res.status(200).send('empty Function call');
}
router.get('/demo', dummyFunction);
export default router;
