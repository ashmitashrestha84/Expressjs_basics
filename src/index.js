//! expressJs
//* every request have its own path and path has its own handler
//* handle the error on its own(default)
//* can create a function between req and res i.e mid wave

// const http =require("http")
import http from "http";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/products.routes.js";
import categoryRoutes from "./routes/category.routes.js";

//* creating express app instance
const app = express();

const middleware=(req,res,next)=>{
  console.log("middleware 1");
  // console.log(req.user)-> undefined
  next();    //helps the code to run beyond the app.use(middleware);
}

//! using middleware

app.use(middleware);


app.use((req,res,next)=>{
  console.log("middleware 2");
  req.user={
    name:"John Doe",
  }
  next();
});


app.use((req,res,next)=>{
  console.log("middleware 3");
  console.log(req.user);     //same req is used by every middleware
  res.status(200).json({
    message:"response from mid3",   //doesnot allow the middleware to pass beyond this 
                               //function and same response is use till last i.e. controllers
  });
  next();
});

//* creating http server
const server = http.createServer(app);
app.use(express.json());   //req.body

//* home -> get ,/ =><h1><Home Page/h1>
//app.get(path,handler);
app.get("/", (req, res) => {
  res.status(200).json({
    message:"server is up and running",
  });
});

//!using routes
app.use("/users",userRoutes);

app.use("/products",productRoutes);

app.use("/category",categoryRoutes);

server.listen(8080, "localhost", () => {
  console.log(`Server is running at local host http://localhost:8080`);
  console.log("press ctrl+c in terminal to close the server ");
});


//req.params -> {}

//http://localhost:8080/users?name=john&page=1&limit=10
//req.query-> {}  -> used in filter,search -> {name:"John",page:"1",limit:"10"};

//req.body -> {}

//name,email=> users.body

//* REST api
//? REST -> Representational state transfer -> set of rules
//? api -> application programming interface


//? constaints
 //* stateless -> request should not managed by server -> every request is treated completely new by server
//all the information needed should come with request

//*client-server architecture
//* layered architecture
// client - cdn, proxy server, loadbalancer ... -server

//* cacheable response
//Cache-Control

//? rules
//* uniform interface
//? route naming -> 
// use noun
// get -> /users
// post -> /users 
//? use meaningful http -> GET, POST, PUT/PATCH, DELETE 
//? use meaningful response status code -> 
//? 100-199 -> informational 
//? 200-299 -> successful response
//200 -> ok ,201 -> created
//? 300-399 -> read directional
//? 400-499 -> client side error ,,404
// 400 -> bad request
//401 -> unauthorized
// 403 -> forbidden
//404 -> not found
//? 500-599 -> server side error ,500, 502
// 500 -> internal server error
//502 -> bad gateway 

//! endpoint
//* get /users
//* get by id /users/id

//! resource 
// /dashboard={}
// users=> json, html, xml
// convert the state into json format and transfer

//* middleware
//? is a function execute between req-res cycle
//? 1. has access to req obj, res obj and next function
//? 2. can execute own logic -> multiple function like authentication must be used in different req,res then we use middleware
//? 3. can modify req & res object
//? 4. can end req-res cycle


//* types of middleware
//* custom mid
//? 1. application level middle ware -> all req of application
//? 2. route level middle ware-> specific req of server
//? 3. error handler middleware-> error handling in global level

//req->  middleware1 -> middleware2 -> middlewareN -> controller     //multiple middlewarw can be used
//is called one after another and after middlewareN routing is called.

//* thirdparty middleware
// multer is a thirdparty middleware.
