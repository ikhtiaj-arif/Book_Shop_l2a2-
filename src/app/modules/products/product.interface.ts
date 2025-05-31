// title (string): The title of the book.

import { Types } from "mongoose";

// author (string): The author of the book.

// price (number): Price of the book.

// category (string): The genre or category of the book (e.g., Fiction, Science). use enum, exact value (Fiction, Science, SelfDevelopment, Poetry, Religious)

// description (string): A brief description of the book.

// quantity (number): Quantity of the book available.

// inStock (boolean): Indicates if the book is in stock.

export interface IBook1 {
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
  description: string;
  quantity: number;
  inStock: boolean;
  created_at?: Date;
  updated_at?: Date;
}
export interface IBookWithCategoryRef extends IBook {
  category: Types.ObjectId;
}

export interface IBook {
  title: string; // Book title
  author: string; // Author name
  description: string; // Full book description
  category: Object; // Main category
  price: number; // Current price
  originalPrice?: number; // Original price (for discounts)
  isbn: string; // ISBN number
  publisher: string; // Publisher name
  publishedDate: string; // Publication date (ISO format)
  language: string; // Book language
  pages: number; // Number of pages
  format: string; // Format (hardcover, paperback, ebook)
  dimensions?: string; // Physical dimensions
  weight?: string; // Weight
  images: string; // Array of image URLs
  rating: number; // Average rating (1-5)
  reviewCount: number; // Number of reviews
  inStock: boolean; // Availability status
  stockQuantity: number; // Number of copies in stock
  tags: string[]; // Related tags/keywords
  featured: boolean; // Is featured book
  bestseller: boolean; // Is bestseller
  newArrival: boolean; // Is new arrival
  discount?: number; // Discount percentage
  createdAt: string; // Creation timestamp (ISO format)
  updatedAt: string; // Last update timestamp (ISO format)
}

type IProduct = {
  title: string;
  author: string;
  price: number;
  discountPrice?: number; // Optional field for discount
  imageUrl: string;
  category:
    | "Fiction"
    | "Science"
    | "SelfDevelopment"
    | "Poetry"
    | "Religious"
    | "Biography"
    | "Mystery"
    | "Thriller"
    | "Fantasy"
    | "History"
    | "Romance"
    | "Philosophy"
    | "Technology"
    | "Health & Wellness"
    | "Business"
    | "Children"
    | "Education"
    | "Travel"
    | "Cooking"
    | "Horror"
    | "Graphic Novels";
  description: string;
  publisher: string;
  publicationYear: number;
  language: string;
  stockQuantity: number;
  pageCount: number;
  bestSeller: boolean;
};
