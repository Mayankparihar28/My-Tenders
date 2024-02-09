import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({

  _id : Number,
  name: {
    type: String,
    required: [true,"name is required"],
    trim: true
  },
  email:{
    type: String,
    required: [true,"email is requied"],
    unique: true,
    trim: true
  },
  mobile: {
    type : String,
    required: [true,"mobile is required"],
    maxlength: 10,
    minlengthl: 5,
    trim: true
  },
  address: {
    type: String,
    required: [true,"address is required"],
    trim: true
  },
  city:{
    type: String,
    required: [true,"address is required"],
    trim: true
  },
  gender :{
    type: String,
    required: [true,"address is required"],
    trim: true
  },
  status: Number,
  role: String,
  info: String
});

//validation check
userSchema.plugin(uniqueValidator);

const userSchemaModel=mongoose.model('collection',userSchema);

export default userSchemaModel;