

import Author from '../models/author.model.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';

export const createAuthor = async (req, res) => {
  try {
    const { name, bio, email } = req.body;

    // Input validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json(new ApiError(400, 'Name is required and must be a non-empty string.'));
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json(new ApiError(400, 'Email is required and must be a valid string.'));
    }

    // Check if the email already exists
    const emailExist = await Author.findOne({ email });
    if (emailExist) {
      return res.status(400).json(new ApiError(400, 'Author with this email already exists.'));
    }

    // Create new author
    const  newAuthor = Author.create({name, bio, email})

    return res.status(201).json(new ApiResponse(201, newAuthor, 'Author created successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};




export const getAuthorDetails = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      return res.status(400).json(new ApiError(400, 'Author ID is required.'));
    }
    const author = await Author.findById(id);
    // Check if the author exists
    if (!author) {
      return res.status(404).json(new ApiError(404, 'Author not found.'));
    }
    // Return the author details
    return res.status(200).json(new ApiResponse(200, author, 'Author details fetched successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};


export const  getAllAuthor=async (req,res)=>{
    try {
        const allAuthors=await  Author.find().populate(`name,bio`)
         res.status(200).json(new ApiResponse(200, books, 'All books fetched successfully.'));
    } catch (error) {
        res.status(500).json(new ApiError(500,'Internal  server Error',[error.message]))
        
    }
}

export const updateAuthor=  async (req,res)=>{
    try {
        const id=req.params.id;
        const updatedData= req.body;
        const updatedAuthor= await Author.findByIdAndUpdate(id,updatedData,{
            new:true,
        })
        if(!updateAuthor){
            return res.status(404).json(new ApiError(400,'Author  is not found'))
        }
        res.status(200).json(new ApiResponse(200,updateAuthor,"Author is updated "))
    } catch (error) {
        res.status(500).json(new ApiError(500,'Internal  server Error',[error.message]))
    }
}


export const deleteAuthor=async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteAuthor=await Author.findByIdAndDelete(id);
        if(!deleteAuthor){
            return res.status(404).json(new ApiError(400,'Author  is not found'))
        }
        res.status(200).json(new ApiResponse(200,updateAuthor,"Author is deleted "))
    } catch (error) {
        
    }
}