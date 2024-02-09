import "../module/connection.js";
import userSchemaModel from "../module/user.model.js";
import url from "url";
import jwt from "jsonwebtoken";
import rs from "randomstring";

export var login = async (req, res, next) => {
  var userDetails = req.body;
  userDetails = { ...userDetails, status: 1 };
  var userList = await userSchemaModel.find(userDetails);
  var l = userList.length;
  if (l != 0) {
    let payload = { subject: userList[0].email };
    let key = rs.generate();
    let token = jwt.sign(payload, key);
    return res.status(201).json({ token: token, userDetails: userList[0] });
  } else return res.status(500).json({ token: "error" });
};

// export var updateUser = async (req, res, next) => {
//   var userDetails = await userSchemaModel.findOne(req.body.condition);
//   if (userDetails) {
//     var user = await userSchemaModel.updateOne( req.body.condition,req.body.set);
//     if (user) {
//       res.status(201).json({ response: "success" });
//     } else res.status(500).json({ error: "server error" });
//   } else res.status(404).json({ error: "data not found" });
// };

export var updateUser=async(request,response,next)=>{
  let userDetails = await userSchemaModel.findOne(request.body.condition);
  if(userDetails){
     let user=await userSchemaModel.updateOne(request.body.condition,request.body.set);   
     if(user)
      return response.status(201).json({"msg":"success"});
     else
      return response.status(501).json({error: "Server Error"});
  }
  else
   return response.status(404).json({error: "Requested resource not available"});
}

export var deleteUser = async (req, res, next) => {
  var id = req.params.id;
  var user = await userSchemaModel.find({ _id: id });
  if (user.length != 0) {
    let result = await userSchemaModel.deleteMany({ id });
    if (result) res.status(201).json({ response: "Delete succefully" });
    else res.statu(500).json({ error: "server error" });
  } else res.status(404).json({ error: "data not Found" });
};

export var fetch = async (req, res, next) => {
  var condition_object = url.parse(req.url, true).query;
  var userList = await userSchemaModel.find(condition_object);
  var l = userList.length;
  if (l != 0) return res.status(201).json({ result: userList });
  else return res.status(500).json({ result: "content not found" });
};

export var save = async (req, res, next) => {
  var userDetails = req.body;
  var userList = await userSchemaModel.find();
  var l = userList.length;
  var _id = l == 0 ? 1 : userList[l - 1]._id + 1;
  userDetails = {
    ...userDetails,
    _id: _id,
    status: 0,
    role: "user",
    info: Date(),
  };
  var user = await userSchemaModel.create(userDetails);
  if (user) return res.status(201).json({ status: true });
  else return res.status(500).json({ status: false });

  return res.json({ success: "success" });
};
