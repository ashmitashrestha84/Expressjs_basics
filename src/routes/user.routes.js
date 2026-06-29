import express from "express"
const router= express.Router();

const users=[];
import { getAll,getbyID,create,update,remove} from "../controllers/user.controller.js";

//! CRUD users
//* get all users
router.get("/", getAll);

//* get users by id
// users/:100 => {id:100}
// users/:120 => {id:123}

router.get("/:id",getbyID);

//* create
router.post("/", create);

//* update
router.put("/:id",update);

//* delete
router.delete("/:id", remove);

export default router;
