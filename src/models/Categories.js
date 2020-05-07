import mongoose from 'mongoose';

const categoriesScheme = mongoose.Schema({
  cat_name: String,
  cat_id: String,
});

const Categories = mongoose.model('categories', categoriesScheme);

export default Categories;
