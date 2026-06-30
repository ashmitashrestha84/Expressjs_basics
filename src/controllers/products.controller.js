
const products=[];

export const getAll=(req, res) => {
    // const query=req.query;
    // console.log(query);
//   res.send("<h1>Get all Products</h1>");

res.status(200).json({        
        message:"product",
        success:"true",
        data:{
            _id:1,
            name:"Apple",
            products:products
        }
    })
};
export const getbyID=(req,res)=>{

    const {id}=req.params;
    const product = products.find((product)=>
        product.id === Number(id)
)
    if(!product){
        res.status(404).json({
            message:"product not found",
            success: false,
            data:null,
        })
        return;
    }
    res.status(200).json({        
        message:"product",
        success:"true",
        data:products,
    })
}
export const create=(req, res) => {
//   res.send("<h1>Product created</h1>");
    // console.log(req.body);
    const {name,price,password}= req.body;
    products.push({
        name,
        price,
        password,
        createdAt:new Date(Date.now()),
        _id: products.length+1,
    })
    res.status(201).json({
        message:"product created",
        success:"true",
        data:products[products.length-1],
    })
}
export const update=(req, res) => {
    const {id}= req.params;
//   res.send("<h1>Product Updated</h1>");
    const { name, price, password }= req.body;
    const index=products.findIndex((product)=>product._id===Number(id));
    
    if(index === -1){
        res.status(404).json({
            message:"product update failed",
            success:false,
            data:null,
        });
        return;
    }
    products[index]={
        ...products[index],
        name,
        price,
        password,
    }
    res.status(201).json({
        message:"product updated",
        success:"true",
        data:products[index],
    });
};

export const remove=(req, res) => {
    const {id}=req.params;
//   res.send("<h1>Product deleted</h1>");
    const index=products.findIndex((product)=>product._id===Number(id));
    if(index === -1){
        res.status(404).json({
            message:"product delete failed",
            success:false,
        });
        return;
    } 
    products.splice(index,1);
    res.status(200).json({
        message:"product deleted",
        success:"true",
        data:null,
    })
};
