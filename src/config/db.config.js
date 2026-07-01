import mongoose from "mongoose";


//connect database function
//? ODM -> object document mapping
export const connectDatabase=()=>{
    mongoose.connect("mongodb://localhost:27017/team_14_3_30")
    .then(()=>{
        console.log("database connected");
    })
    .catch((error)=>{
        console.log("-----Database connection error-----");
        console.log(error);
    })

}
