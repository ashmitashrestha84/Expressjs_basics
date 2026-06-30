const category=[];

//getALL
export const getAll=((req,res)=>{
    res.status(200).json({
        message:"Category found",
        success:true,
        data:{
            id:1,
            name:"Food"
        }
    })
});

export const getbyID=((req,res)=>{
    const {id}=req.params
    const categ=category.find((categ)=>categ.id===Number(id));
    if(!found){
        res.status(404).json({
        message:"Category not found",
        success:false,
        data:null,
        })
    }
    res.status(200).json({
        message:"Category found",
        success:true,
        data:category,
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

export const update=((req,res)=>{
    const {id}= req.params;
    const index=category.findIndex((categ)=> categ.id=== Number(id))
    const {name,price,brand}=req.body;
    if(index===-1){
        res.status(404).json({
            message:"Category update fail",
            success:false,
            data:null,
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

export const remove=(req, res) => {
    const {id}=req.params;
//   res.send("<h1>Product deleted</h1>");
    const index=category.findIndex((categ)=>categ.id===Number(id));
    if(index === -1){
        res.status(404).json({
            message:"Category delete failed",
            success:false,
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


