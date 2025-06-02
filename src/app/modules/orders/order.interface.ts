import { Document, Types } from "mongoose";

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  billingAddress: {
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderStatus = "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";