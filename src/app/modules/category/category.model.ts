import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  description: string;
  image: string;
  icon: string;
  subcategories: string[];
  count: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required!"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Category description is required!"],
    },
    image: {
      type: String,
      required: [true, "Category image URL is required!"],
    },
    icon: {
      type: String,
      required: [true, "Category icon name is required!"],
    },
    subcategories: {
      type: [String],
      default: [],
    },
    count: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt (as Date)
  }
);

export const Category = model<ICategory>("Category", categorySchema);
