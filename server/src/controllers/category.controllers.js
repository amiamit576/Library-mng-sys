import Category from '../models/category.model.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Input validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json(new ApiError(400, 'Category name is required and must be a non-empty string.'));
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json(new ApiError(400, 'Category already exists.'));
    }

    // Create a new category
    const newCategory = await Category.create({ name: name.trim(), description });

    return res.status(201).json(new ApiResponse(201, newCategory, 'Category created successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json(new ApiResponse(200, categories, 'All categories fetched successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params.id;

    // Validate ID
    if (!id) {
      return res.status(400).json(new ApiError(400, 'Category ID is required.'));
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json(new ApiError(404, 'Category not found.'));
    }

    return res.status(200).json(new ApiResponse(200, category, 'Category details fetched successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { name, description } = req.body;

    // Validate ID
    if (!id) {
      return res.status(400).json(new ApiError(400, 'Category ID is required.'));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // Return the updated document and ensure validation
    );

    if (!updatedCategory) {
      return res.status(404).json(new ApiError(404, 'Category not found.'));
    }

    return res.status(200).json(new ApiResponse(200, updatedCategory, 'Category updated successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params.id;

    // Validate ID
    if (!id) {
      return res.status(400).json(new ApiError(400, 'Category ID is required.'));
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json(new ApiError(404, 'Category not found.'));
    }
    return res.status(200).json(new ApiResponse(200, null, 'Category deleted successfully.'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', [error.message]));
  }
};
