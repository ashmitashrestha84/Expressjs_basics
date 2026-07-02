import mongoose from "mongoose";
const category=[];
const categorySchema = new mongoose.Schema(
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
    brand: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

// Get all categories
export const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      message: "Categories fetched successfully",
      success: true,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

// Get category by ID
export const getbyID = async(req, res, next) => {
  try {
    const {id} = req.params;
    const categ = await findOne({id:id});

    if (!categ) {
      return next({
        message: "Category not found",
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: "Category found",
      success: true,
      data: categ,
    });
  } catch (err) {
    next(err);
  }
};

export const create=(req,res,next)=>{
 try{
   const {name,price,brand}= req.body;
    const category=({
        name,
        price,
        brand,
        createdAt:Date.now(),
        id:category.length+1,
})
    res.status(200).json({
        message:"Product Created",
        success:true,
        data:category,
    })
}
catch(err){
  next(err);
}
}
export const update=async(req,res,next)=>{
  try{
    const {id}= req.params;
    const {name,price,brand}=req.body;
    const category=await Category.findByIdAndUpdate(
      id,
      {
        name,
        price,
        brand,
      },
      {
      new: true,
      runValidators: true,
      } 
    )
    if(index===-1){
        next({
            message:"Category update fail",
            statusCode:404,
        })
    }
    res.status(200).json({
        message:"Update success",
        success:true,
        data:category,
    })
}
catch(err){
  next(err);
}
}

export const remove=async(req, res,next) => {
    try{
      const {id}=req.params;
//   res.send("<h1>Product deleted</h1>");
    const category=await Category.findByIdAndDelete(id);
    if(!category){
        next({
            message:"Category delete failed",
            statusCode:404,
        });
        return;
    }
    // category.splice(index,1);
    res.status(200).json({
        message:"Category deleted",
        success:true,
        data:category,
    })
}
catch(err){
   next(err);
}
};

