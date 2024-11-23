import { Request, Response } from 'express';
import { productServices } from './product.service';

const {
  createBookIntoDB,
  getAllBooksFromDB,
  getBookFromDB,
  updateBookToDB,
  deleteBookFromDB,
} = productServices;

const createBook = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    //passed the client data to the services function to handle the database actions
    const result = await createBookIntoDB(productData);

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || 'Something went wrong',
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await getAllBooksFromDB();
    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || 'Something went wrong',
    });
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.productId;
    const result = await getBookFromDB(bookID);

    if (result) {
      res.status(200).json({
        message: 'Book retrieved successfully',
        success: true,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found!',
      });
    }
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || 'Something went wrong',
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.productId;
    const bookData = req.body;
    //  checking if the user is updating the quantity of the book or not
    if (bookData.quantity !== undefined) {
      if (bookData.quantity === 0) {
        bookData.inStock = false;
      } else {
        bookData.inStock = true;
      }
    }

    const result = await updateBookToDB(bookID, bookData);

    if (result) {
      res.status(200).json({
        message: 'Book updated successfully',
        success: true,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found!',
      });
    }
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || 'Something went wrong',
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.productId;
    const result = await deleteBookFromDB(bookID);

    if (result) {
      res.status(200).json({
        message: 'Book deleted successfully',
        success: true,
        data: {},
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found!',
      });
    }
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || 'Something went wrong',
    });
  }
};

export const productControllers = {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
};
