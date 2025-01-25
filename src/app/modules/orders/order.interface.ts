import { Types } from 'mongoose';

export interface IOrder {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  created_at?: Date;
  updated_at?: Date;
}
