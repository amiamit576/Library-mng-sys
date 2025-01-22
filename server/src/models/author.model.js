import { mongoose, Schema } from 'mongoose';

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      lowercase: true,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
      lowercase: true, 
      validate: {
        validator: function (email) {
          
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please enter a valid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
