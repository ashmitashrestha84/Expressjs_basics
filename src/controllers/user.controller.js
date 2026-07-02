import mongoose from "mongoose";

const users=[];

//! user schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
    },
    email:{
        type:String,
        requires:true,
        unique: true,
    },
    password:{
        type:String,
        requires:true,
    },
},{timestamps:true});

//! creating user model
const User=mongoose.model('user',userSchema);   //sync operation



export const getAll=async(req, res,next) => {
//   res.send("<h1>Get all Users</h1>");

    try{
    const query=req.query;
    console.log(query);

    //* database find all query
    const users=await User.find({}); 
    res.status(200).json({
    message:"user created",
    success:true,
    data:users,
});
}
    catch(err){
        next(err);
    }
};
export const getbyID=async(req,res,next)=>{
    //req.params=>{}=>{id:1};
    try{ 
        const {id}=req.params;
    const user= await find.One({_id:id});
    // const user= users.find((user)=>user.id == Number(id));
    if(!user){
        // res.status(404).json({
        //     message:"user not found",
        //     success:false,
        //     data:null,
        // });
        next({
            message:"User fetched failed",
            statusCode:404,
        })
        return;
    }
    res.status(200).json({
        message:"user fetched",
        success:"true",
        data:users,
});
}
catch(err){
    next(err);
}
}
export const create= async(req, res, next) => {
//   res.send("<h1>Users created </h1>");
// const data=req.body
// users.push({
//     ...data,
// })
try{
const user=await User.create({
    name,
    email,
    password,
});
res.status(201).json({
    message:"user created",
    success:true,
    data: user,
})
}
catch(err){
    next(err);
}
}
export const update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name,email,password}=req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
    next({
        message: "User not found",
        statusCode: 404,
      });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      data:user,
    });
  } catch (err) {
    next(err);
  }
};

export const remove =async(req, res,next) => {
    try{
    const {id} = req.params;
    const user=await User.findByIdAndDelete(id);
    if (!user) {
        next({
            message: "User not found",
            statusCode:404,
        });
        return;
    }
    res.status(200).json({
        message: "User deleted",
        success: true,
        data: user,
    });
}
catch(err){
    next(err);
}
}