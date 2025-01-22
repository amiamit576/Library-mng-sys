import { Router } from "express"; 
import {createBook,getBookByID,getAllBooks,updateBook,deleteBook } from "../controllers/bookcontroller.js";

const router = Router(); 

// Route to create a book
router.route('/createBook').post(createBook);

// Route to get all books
router.route('/').get(getAllBooks );

// Route to get a book by ID
router.route('/:id').get(getBookByID);

// Route to update a book by ID
router.route('/:id').put(updateBook);

// Route to delete a book by ID
router.route('/:id').delete(deleteBook);

export default router;
