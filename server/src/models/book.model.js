import {mongoose,Schema} from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title can't be more than 100 characters"],
    lowercase: true,
    trim: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: [true, "ISBN is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, "Author is required"],
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: [true, "Publisher is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "Category is required"],
  },
  publicationYear: {
    type: Number,
    required: [true, "Publication year is required"],
  },
  copiesAvailable: {
    type: Number,
    required: [true, "Number of copies available is required"],
  },
  copies: [
    {
      copyId: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
