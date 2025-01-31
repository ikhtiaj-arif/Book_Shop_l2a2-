// title (string): The title of the book.

// author (string): The author of the book.

// price (number): Price of the book.

// category (string): The genre or category of the book (e.g., Fiction, Science). use enum, exact value (Fiction, Science, SelfDevelopment, Poetry, Religious)

// description (string): A brief description of the book.

// quantity (number): Quantity of the book available.

// inStock (boolean): Indicates if the book is in stock.

export interface IBook {
  title: string;
  author: string;
  price: number;
  imageUrl: string
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
  created_at?: Date;
  updated_at?: Date;
}

type IProduct = {
  title: string;
  author: string;
  price: number;
  discountPrice?: number; // Optional field for discount
  imageUrl: string;
  category: 
    | 'Fiction' 
    | 'Science' 
    | 'SelfDevelopment' 
    | 'Poetry' 
    | 'Religious' 
    | 'Biography' 
    | 'Mystery' 
    | 'Thriller' 
    | 'Fantasy' 
    | 'History' 
    | 'Romance' 
    | 'Philosophy' 
    | 'Technology' 
    | 'Health & Wellness' 
    | 'Business' 
    | 'Children' 
    | 'Education' 
    | 'Travel' 
    | 'Cooking' 
    | 'Horror' 
    | 'Graphic Novels';
  description: string;
  publisher: string;
  publicationYear: number;
  language: string;
  stockQuantity: number;
  pageCount: number;
  bestSeller: boolean;
};
