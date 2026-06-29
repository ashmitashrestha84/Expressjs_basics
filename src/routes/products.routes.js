import express from "express";
const router= express.Router();

import { getAll,getbyID,create,update,remove } from "../controllers/products.controller.js";
//! CRUD PRODUCTS
router.get("/", getAll);

router.get("/:id",getbyID);
router.post("/", create);


router.put("/:id", update);

router.delete("/:id", remove );

export default router;