import express from "express"
const router= express.Router();

const users=[];
//! CRUD users
//* get all users
router.get("/", (req, res) => {
//   res.send("<h1>Get all Users</h1>");
    res.status(200).json({
    message:"user created",
    success:true,
    data:users,
})
});

//* get users by id
// users/:100 => {id:100}
// users/:120 => {id:123}

router.get("/:id",(req,res)=>{
    //req.params=>{}=>{id:1};
    const {id}=req.params;
    const user= users.find((user)=>{
        user.id == Number(id);
    })
    if(!user){
        res.status(404).json({
            message:"user not found",
            success:false,
            data:null,
        });
        return;
    }
    res.status(200).json({
        message:"user fetches",
        success:"true",
        data:[{
            _id:id,
            name:"John Doe",
            email:"john@gmail.com",
        }]
    })
})



//* create
router.post("/", (req, res) => {
//   res.send("<h1>Users created </h1>");
// const data=req.body
// users.push({
//     ...data,
// })

const {name,email,password}= req.body;
users.push({
    name,
    email,
    password,
    createdAt: Date.now(),
    _id: users.length+1,
});
res.status(201).json({
    message:"user created",
    success:true,
    data: users[users.length -1],
})
});

//* update
router.put("/:id", (req, res) => {
    const {id}=req.params;
    const {name,email,password}=req.body

    const index= users.findIndex((user)=> user._id=== Number(id));
    if(index===-1){
        res.status(404).json({
            message:"user not found",
            success:"false",
            data:null,
        })
        return;
    }

    users[index]={
        ...users[index],
        name,
        email,
        password,
    }
//   res.send("<h1>Users Updated</h1>");
    res.status(201).json({
        message:"user updated",
        success:true,
        data:users[index],
    })
});

//* delete
router.delete("/:id", (req, res) => {
    const {id}=req.params;

    const index=users.findIndex((user)=> user._id===Number(id));
    if(index===-1){
        res.status(404).json({
            message:"user not found",
            success:false,
            data:null,
        })
        return;
    }
    users.splice(index,1)
//   res.send("<h1>Users delete</h1>");

    res.status(200).json({
        message:"user deleted",
        success:"true",
        data:null,
    })
});

export default router;
