import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

//create Schema
const OrderSchema = new Schema<IOrder>({
  email: { type: String, required: [true, 'Email is required!'] },
  product: { type: Schema.Types.ObjectId, ref: 'Products',  required: [true, 'Product is required!'] },

  quantity: { type: Number, required: [true, 'Quantity is required!'] },
  totalPrice: { type: Number, required: [true, 'Quantity is required!'] },

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
export const Order = model<IOrder>('Orders', OrderSchema);
