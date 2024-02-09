import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import url from 'url'

var categorySchema = mongoose.Schema({
 
  _id:Number,
  catnm: {
    type: String,
    required: [true,"Name is required"],
    lowercase: true, 
    unique: true,
    trim: true,
  },
  caticonnm: {
    type: String,
    required: [true,"Category icon is required"],
    trim: true
  }
});

categorySchema.plugin(uniqueValidator);

var categorySchemaModel=mongoose.model('category_collection',categorySchema);

export default categorySchemaModel;