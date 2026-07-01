const category=[];

//getALL
export const getAll=((req,res)=>{
    res.status(200).json({
        message:"Category found",
        success:true,
        data:category,
    })
});

export const getbyID=((req,res,next)=>{
    const {id}=req.params
    const categ=category.find((categ)=>categ.id===Number(id));
    if(!categ){
        next({
        message:"Category not found",
        statusCode:404,
        })
    }
    res.status(200).json({
        message:"Category found",
        success:true,
        data:categ,
    })
});

export const create=((req,res)=>{
    const {name,price,brand}= req.body;
    category.push({
        name,
        price,
        brand,
        createdAt:Date.now(),
        id:category.length+1,
})
    res.status(200).json({
        message:"Product Created",
        success:true,
        data:category[category.length-1],
    })
})

export const update=((req,res,next)=>{
    const {id}= req.params;
    const index=category.findIndex((categ)=> categ.id=== Number(id))
    const {name,price,brand}=req.body;
    if(index===-1){
        next({
            message:"Category update fail",
            statusCode:404,
        })
    }
        category[index]={
        ...category,
        name,
        price,
        brand,
    }
    res.status(200).json({
        message:"Update success",
        success:true,
        data:category[index],
    })
})

export const remove=(req, res,next) => {
    const {id}=req.params;
//   res.send("<h1>Product deleted</h1>");
    const index=category.findIndex((categ)=>categ.id===Number(id));
    if(index === -1){
        next({
            message:"Category delete failed",
            statusCode:404,
        });
        return;
    } 
    category.splice(index,1);
    res.status(200).json({
        message:"Category deleted",
        success:"true",
        data:null,
    })
};


