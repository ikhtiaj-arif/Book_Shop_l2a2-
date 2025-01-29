import mongoose, { model, Schema, Document, Types } from "mongoose";
import { IOrder } from "./order.interface";

// Create Schema
const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Books",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          validate: {
            validator: (value: number) => value > 0,
            message: "Quantity must be a positive integer",
          },
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value > 0,
        message: "Total price must be a positive number",
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
);


orderSchema.pre("save", async function (next) {
  try {
    for (const item of this.products) {
      const book = await mongoose.model("Books").findById(item.product);

      if (!book) {
        const error = new Error("Book not found");
        error.name = "bookNotFound";
        return next(error);
      }

      if (book.quantity < item.quantity) {
        const error = new Error("Insufficient books in stock");
        error.name = "insufficientStock";
        return next(error);
      }

      book.quantity -= item.quantity;

      if (book.quantity === 0) {
        book.inStock = false;
      }

      await book.save();
    }

    next();
  } catch (error) {
    throw new Error("Something went wrong")
  }
});

// Create and export Model
export const Order = model<IOrder>("Orders", orderSchema);