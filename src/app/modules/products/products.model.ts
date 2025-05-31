// import { model, Schema } from "mongoose";

// import { IBook } from "./product.interface";

// //create Schema
// const bookSchema = new Schema<IBook>({
//   title: {
//     type: String,
//     required: [true, "Title is required!"],
//     unique: true,
//     validate: {
//       validator: (value: string) => /^[a-zA-Z0-9\s.,'’]+$/.test(value.trim()),
//       message: "Title contains invalid characters!",
//     },
//   },
//   author: {
//     type: String,
//     required: [true, "Author name is required!"],
//   },
//   price: {
//     type: Number,
//     required: [true, "Price is required!"],

//   },
//   imageUrl: { type: String, required: [true, "Image is required!"] },
//   category: {
//     type: String,
//     enum: {
//       values: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
//       message: "Invalid category",
//     },
//     required: [true, "Category is required!"],
//   },
//   description: {
//     type: String,
//     required: [true, "Description is required!"],
//   },
//   quantity: {
//     type: Number,
//     required: [true, "Quantity is required!"],
//     validate: {
//       validator: (value: number) => Number.isInteger(value) && value >= 0,
//       message: "Quantity must be a non-negative integer!",
//     },
//   },
//   inStock: {
//     type: Boolean,
//     default: true,
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
//   updated_at: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // create a Model.
// export const Book = model<IBook>("Books", bookSchema);

import { model, Schema } from "mongoose";
import { IBookWithCategoryRef } from "./product.interface";

// updated IBook to include category as ObjectId if needed

const bookSchema = new Schema<IBookWithCategoryRef>(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      unique: true,
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
    },
    originalPrice: Number,
    isbn: String,
    publisher: String,
    publishedDate: String,
    language: String,
    pages: Number,
    format: String,
    dimensions: String,
    weight: String,
    images: String,
    rating: Number,
    reviewCount: Number,
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    discount: Number,

    // 🔗 Connect category by reference
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required!"],
    },

    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
    updatedAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBookWithCategoryRef>("Books", bookSchema);
