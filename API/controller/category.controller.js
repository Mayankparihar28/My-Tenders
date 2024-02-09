import express from 'express';
import categorySchemaModel from '../module/category.model.js';
import url from 'url';
import path from 'path';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


export var save=async (req,res,next)=>{
  var categoryDetails=req.body;
  var caticon = req.files.caticon;
  var caticonname=Date.now()+"-"+caticon.name;
  var uploadpath=path.join(__dirname,"../../UI/public/assets/upoloads/caticons",caticonname);
  caticon.mv(uploadpath);
  var cList = await categorySchemaModel.find();
  var l=cList.length;
  var _id=l==0?1:cList[l-1]._id+1;
  var categoryDetails={...categoryDetails,"_id":_id,"caticonnm":caticonname};
  var category = await categorySchemaModel.create(categoryDetails);
  if(category)
    return res.status(201).json({"result":"Category added successfully...."});
  else
    return res.status(500).json({"result": "Server Error"});

}
/*
export var updateCategory=async(request,response,next)=>{
  let cDetails = await CategorySchemaModel.findOne({_id: request.body._id});
  if(cDetails){
     let id = request.body._id;
     delete request.body._id;
     let c=await CategorySchemaModel.updateOne({_id: id},{$set: request.body});   
     if(c)
      return response.status(201).json({"msg":"success"});
     else
      return response.status(500).json({error: "Server Error"});
  }
  else
   return response.status(404).json({error: "Requested resource not available"});
} */
export var updatecategory=async (req,res,next)=>{
  var ctDetails= await categorySchemaModel.findOne({_id:req.body._id});
  if(ctDetails){
  var id=req.body._id;
  delete req.body._id;
  var category= await categorySchemaModel.updateOne({_id:id},{$set:req.body});
  if(category)
  return res.status(201).json({"msg":"success"});
  else
   return res.status(500).json({error: "Server Error"});
}
else
return res.status(404).json({error: "Requested resource not available"});
}

export var deleteCategory = async (req,res,next)=>{
  var id = req.params.id;
  var ctDetails= await categorySchemaModel.find({_id:id});
  var l = ctDetails.length;
  if(l!=0){
    let result= await categorySchemaModel.deleteMany({_id:id});
    if (result)
  res.status(201).json({"result":ctDetails});
  else
  res.status(500).json({error:"server error"});
}
else
res.status(404).json({error:"requseted resorce not found"});
}
  
export var fetch = async (req,res,next)=>{
  var condition_object=url.parse(req.url,true).query;
  var cList= await categorySchemaModel.findOne(condition_object);
  var l = cList.length;
  if(l!=0)
  res.status(201).json(cList);
  else
  res.status(500).json({error:"server error"});
}



// export var save= async (req,res,next)=>{
//   var ctDetails=req.body;
//   var caticon=req.files.caticon;
//   var caticonname=Date.now()+"-"+caticon.name;
//   var uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/caticons",caticonname);
//   caticon.mv(uploadpath);
//   console.log( caticon);
//   var ctList= await ctSchemaModel.find();
//   var l=ctList.length;
//   var _id= l==0?1:ctList[l-1]._id+1;
//   // ctDetails={...ctDetails,"_id":_id};
//   var ctDetails={...ctDetails,"_id":_id,"caticonnm":ctDetails};

//   var category = await ctSchemaModel.create(ctDetails);
//   if(category)
//   res.status(201).json({"result":"category added successfully"});
//   else
//   res.status(500).json({error:"server error"});

// }