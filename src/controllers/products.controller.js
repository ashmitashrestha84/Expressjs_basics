import mongoose from "mongoose";
const products=[];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
export const getAll=async(req, res,next) => {
    // const query=req.query;
    // console.log(query);
//   res.send("<h1>Get all Products</h1>");
try{
    console.log("get all products");
    console.log(req.user);
res.status(200).json({        
        message:"product",
        success:"true",
        data:products,
    })
}
catch(err){
    next(err);
}
}
export const getbyID=async(req,res,next)=>{
    try{
    const {id}=req.params;
    const product = await findOne({_id:id})
    if(!product){
        next({
            message:"Product fetched failed",
            statusCode:404,
        })
        return;
    }
    res.status(200).json({        
        message:"product",
        success:"true",
        data:product,
    })
}
catch(err){
    next(err);
}}
export const create=async(req, res, next) => {
//   res.send("<h1>Product created</h1>");
  // console.log(req.body);
 try{
  const {name,price,password}= req.body;
    const product=({
        name,
        price,
        password,
    })
    res.status(201).json({
        message:"product created",
        success:"true",
        data:product,
    })
}catch(err){
    next(err);
}
};
export const update=async(req, res,next) => {
    try{
    const {id}= req.params;
//   res.send("<h1>Product Updated</h1>");
    const { name, price, password }= req.body;
    const product=await Product.findByIdAndUpdate(
        id,
        {
        name,
        price,
        password,
        },
        {
        new: true,
        runValidators: true,
      }
    );
    
    if(!product){
        next({
            message:"product update failed",
        statusCode:404,
        });
        return;
    }
    res.status(200).json({
        message:"product updated",
        success:"true",
        data:product,
    });
}
catch(err){
    next(err);
}
}

export const remove=async(req, res) => {
    try{
    const {id}=req.params;
//   res.send("<h1>Product deleted</h1>");
    const product=await Product.findByIdAndDelete(id);
    if(!product){
        next({
            message:"product delete failed",
            statusCode:404,
        });
        return;
    } 
    res.status(200).json({
        message:"product deleted",
        success:true,
        data:product,
    })
}
catch(err){
    next(err);
}
}
