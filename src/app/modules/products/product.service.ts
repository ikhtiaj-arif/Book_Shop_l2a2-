import QueryBuilder from "../../builder/QureyBuilder";
import { IBook } from "./product.interface";
import { Book } from "./products.model";

const createBookIntoDB = async (bookData: IBook) => {
  //established connection to the book model to create data according to the models schema to the database
  const result = await Book.create(bookData);
  return result;
};

// const getAllBooksFromDB = async () => {
//   //get all books from db
//   const result = await Book.find().populate('category');
//   return result;
// };
const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = [
    "title",
    "author",
    "description",
    "isbn",
    "publisher",
    "language",
    "format",
    "tags",
  ];
  console.log("query", query);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  // Data query with filters, search, sort, pagination and fields
  const bookQuery = new QueryBuilder(Book.find().populate("category"), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await bookQuery.modelQuery;

  // Count query without pagination but with filters & search
  const countQuery = new QueryBuilder(Book.find(), query)
    .search(searchableFields)
    .filter();

  const total = await countQuery.modelQuery.countDocuments();

  const meta = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };

  return { data, meta };
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
