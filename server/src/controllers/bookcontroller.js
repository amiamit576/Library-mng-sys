import { v4 as uuidv4 } from 'uuid';
import Book from '../models/book.model.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import Author from '../models/author.model.js';
import Publisher from '../models/publisher.model.js';
import Category from '../models/category.model.js';

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, isbn, author, publisher, category, publicationYear, copiesAvailable } = req.body;

    // Input Validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json(new ApiError(400, 'Title is required and must be a non-empty string.'));
    }
    if (!isbn || typeof isbn !== 'string' || isbn.trim() === '') {
      return res.status(400).json(new ApiError(400, 'ISBN is required and must be a non-empty string.'));
    }
    if (!author || typeof author !== 'string' || author.trim() === '') {
      return res.status(400).json(new ApiError(400, 'Author ID is required and must be a non-empty string.'));
    }
    if (!publisher || typeof publisher !== 'string' || publisher.trim() === '') {
      return res.status(400).json(new ApiError(400, 'Publisher ID is required and must be a non-empty string.'));
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json(new ApiError(400, 'Category ID is required and must be a non-empty string.'));
    }
    if (!publicationYear || typeof publicationYear !== 'number' || publicationYear <= 0) {
      return res.status(400).json(new ApiError(400, 'Publication year is required and must be a positive number.'));
    }
    if (!copiesAvailable || typeof copiesAvailable !== 'number' || copiesAvailable <= 0) {
      return res.status(400).json(new ApiError(400, 'Copies available is required and must be a positive number.'));
    }

    // Validate References
    const authorExists = await Author.findById(author);
    const publisherExists = await Publisher.findById(publisher);
    const categoryExists = await Category.findById(category);

    if (!authorExists || !publisherExists || !categoryExists) {
      return res.status(400).json(new ApiError(400, 'Invalid references: Author, Publisher, or Category not found.'));
    }

    // Check if Book Already Exists
    const existingBook = await Book.findOne({ $or: [{ isbn }, { title }] });
    if (existingBook) {
      return res.status(400).json(new ApiError(400, 'Book already exists.'));
    }

    // Create a New Book
    const newBook = new Book({
      title,
      isbn,
      author,
      publisher,
      category,
      publicationYear,
      copiesAvailable,
      copies: Array.from({ length: copiesAvailable }, () => ({ copyId: uuidv4() })),
    });

    await newBook.save();

    return res.status(201).json(new ApiResponse(201, newBook, 'Book created successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author publisher category');
    return res.status(200).json(new ApiResponse(200, books, 'All books fetched successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Get a book by ID
export const getBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate('author publisher category');

    if (!book) {
      return res.status(404).json(new ApiError(404, 'Book not found.'));
    }

    return res.status(200).json(new ApiResponse(200, book, 'Book details fetched successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).populate('author publisher category');

    if (!updatedBook) {
      return res.status(404).json(new ApiError(404, 'Book not found.'));
    }

    return res.status(200).json(new ApiResponse(200, updatedBook, 'Book updated successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json(new ApiError(404, 'Book not found.'));
    }

    return res.status(200).json(new ApiResponse(200, null, 'Book deleted successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};
