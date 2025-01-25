import mongoose, { model, Schema } from 'mongoose';

import { IOrder } from './order.interface';

//create Schema
const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: 'Invalid email format',
    // },
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: [true, 'Product is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    validate: {
      validator: (value: number) => value > 0,
      message: 'Quantity must be a positive integer',
    },
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    validate: {
      validator: (value: number) => value > 0,
      message: 'Total price must be a positive number',
    },
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

//using pre middleware to check the quantity of the product

orderSchema.pre('save', async function (next) {
  try {
    // const orders = this.
    const bookId = this.product;
    const quantity = this.quantity;

    const book = await mongoose.model('Books').findById(bookId);

    //if bookId dosen't match any books
    if (!book) {
      const error = new Error('Book not found');
      error.name = 'bookNotFound';
      return next(error);
    }

    //check if the quantity of order is more then the stock
    if (book.quantity < quantity) {
      const error = new Error('Insufficient books in stock');
      error.name = 'insufficientStock';
      return next(error);
    }

    //reducing the quantity from the books stock
    book.quantity -= quantity;

    // check if the quantity becomes 0, set inStock = false
    if (book.quantity === 0) {
      book.inStock = false;
    }

    await book.save();

    next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
});

// create a Model.
export const Order = model<IOrder>('Orders', orderSchema);
