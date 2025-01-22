
import { Router } from "express";
import { createAuthor,getAllAuthor,getAuthorDetails,updateAuthor,deleteAuthor } from "../controllers/author.controllers.js";



//

const router=Router();



router.route("/getAllAuthor").get(getAllAuthor);
router.route("/createAuthor").post(createAuthor);
router.route("/:id").get(createAuthor);
router.route("/updateAuthor:id").put(updateAuthor);
router.route("/deleteAuthor;id").delete(deleteAuthor)


export  default router;
