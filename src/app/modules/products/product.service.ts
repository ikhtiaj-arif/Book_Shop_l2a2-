import { IBook } from "./product.interface";
import { Book } from "./products.model";


const createBookIntoDB = async (bookData: IBook) => {
  //established connection to the book model to create data according to the models schema to the database
  const result = await Book.create(bookData);
  return result;
};

const getAllBooksFromDB = async () => {
  //get all books from db
  const result = await Book.find();
  return result;
};

const getBookFromDB = async (id: string) => {
  //get one book by _id using findById
  const result = await Book.findById(id);

  return result;
};

const updateBookToDB = async (id: string, data: Partial<IBook>) => {
  //update using Partial to get any partial value of type IBook, and update using the _id
  const result = await Book.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteBookFromDB = async (id: string) => {
  //get one book by _id using findById
  const result = await Book.findByIdAndDelete(id);

  return result;
};

export const productServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getBookFromDB,
  updateBookToDB,
  deleteBookFromDB,
};
