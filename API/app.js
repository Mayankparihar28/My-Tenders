import express from 'express';
import bodyParse from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app=express();

import userRouter from './routers/user.Router.js';
import categoryRouter from './routers/category.Router.js';
import subcategoryRouter from './routers/subcategory.Router.js'

//to resolve cross origin problem
app.use(cors());

//to extract file content
app.use(fileUpload());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));


app.use("/user",userRouter);
app.use("/category",categoryRouter);
app.use("/subcategory",subcategoryRouter);

app.listen(3001)
console.log("server invoked at http://localhost:3001");