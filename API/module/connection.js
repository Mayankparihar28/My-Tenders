import mongoose from 'mongoose';

const url="mongodb://127.0.0.1:27017/ltd";

mongoose.connect(url)
console.log("mongodb server connected succefully");