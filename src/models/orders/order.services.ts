import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderToDB = async (orderData: IOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getRevenueByBookFromDB = async () => {
  const result = await Order.aggregate([
    //! here we need the total revenue generated from all orders -->
    // to achieve this we need to aggregate in different stages.
    // first we need to get the book price for each order with the bookID saved in every order
    // we need the quantity of every order
    // we can multiply the price with the quantity to get the revenue of each order.
    // we need to create an array of number to save each orders revenue
    // now we can sum all the numbers of the array to get the final revenue

    //! implementation
    // Step: 1
    // using $lookup to get the book data
    {
      $lookup: {
        from: 'books',
        foreignField: '_id',
        localField: 'product',
        as: 'bookData',
      },
    },
    // Step: 2
    // here the bookData is an array, we need to break the array to access its value
    //we can use $unwind to get each value of the array
    {
      $unwind: '$bookData',
    },
    // Step: 3
    // now we have the bookData object, we can access its value
    // using $project only the revenue and calculate using $multiply
    {
      $project: {
        revenue: { $multiply: ['$quantity', '$bookData.price'] },
      },
    },
    // Step: 4
    //we can group all the documents and sum there revenue using $sum
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);
  return result;
  //   console.log(JSON.stringify(result, null, 2));
};

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    //we can group all the documents using _id: null and sum there revenue using $sum
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);

  return result[0];
  // console.log(JSON.stringify(result, null, 2));
};
export const orderServices = {
  createOrderToDB,
  getRevenueFromDB,
  getRevenueByBookFromDB,
};
