import express from "express";
const router= express.Router();

import { getAll,getbyID,create,update,remove } from "../controllers/products.controller.js";

const mid=(req,res,next)=>{
    console.log("get all products");
    next();
}
//! CRUD PRODUCTS
router.get("/", mid, mid, getAll);

router.get("/:id",getbyID);
router.post("/", create);


router.put("/:id", update);

router.delete("/:id", remove );

export default router;