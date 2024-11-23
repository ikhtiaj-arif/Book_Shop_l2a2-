import { model, Schema } from 'mongoose';
import validator from 'validator';
import { IBook } from './product.interface';

//create Schema
const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    unique: true,
    validate: {
      validator: (value: string) => /^[a-zA-Z0-9\s.,'’]+$/.test(value.trim()),
      message: 'Title contains invalid characters!',
    },
  },
  author: {
    type: String,
    required: [true, 'Author name is required!'],
    validate: {
      validator: (value: string) =>
        validator.isAlpha(value.replace(/[\s.,']/g, ''), 'en-US'),
      message: 'Author name contains invalid characters!',
    },
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
    validate: {
      validator: (value: number) => value > 0,
      message: 'Price must be a positive number!',
    },
  },
  category: {
    type: String,
    enum: {
      values: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      message: 'Invalid category',
    },
    required: [true, 'Category is required!'],
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    validate: [
      // Validating minimum characters
      {
        validator: (value: string) => value.trim().length >= 10,
        message: 'Description must be at least 10 characters!',
      },
      {
        validator: (value: string) => /^[\w\W\s]+$/.test(value.trim()),
        message: 'Description must contain valid characters!',
      },
    ],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required!'],
    validate: {
      validator: (value: number) => Number.isInteger(value) && value >= 0,
      message: 'Quantity must be a non-negative integer!',
    },
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// create a Model.
export const Book = model<IBook>('Books', bookSchema);
