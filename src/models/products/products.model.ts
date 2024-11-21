import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

//create Schema
const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: [true, 'Title is required!'] },
  author: { type: String, required: [true, 'Author name is required!'] },
  price: { type: Number, required: [true, 'Price is required!'] },
  category: {
    type: String,
    enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    required: [true, 'Category is required!'],
  },
  description: {
    type: String,
    required: [true, 'Description Number is required!'],
  },
  quantity: { type: Number, required: [true, 'Quantity is required!'] },
  inStock: { type: Boolean, default: true },
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
export const Product = model<IProduct>('Products', ProductSchema);
