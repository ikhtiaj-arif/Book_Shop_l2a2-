import { Book } from "../products/products.model";
import { IUser } from "../user/user.interface";
import Order from "./order.model";

import { orderUtils } from "./order.utils";

// const createOrderToDB = async (orderData: IOrder, client_ip: string) => {
//   let order;
//   // let order = await Order.create({orderData});

//   //payment integration

//   const shurjopayPayload = {
//     amount: 12,
//     order_id: "orderData",
//     currency: "BDT",
//     customer_name: "BDT",
//     customer_address: "BDT",
//     customer_email: "BDT",
//     customer_phone: "BDT",
//     customer_city: "BDT",
//     client_ip,
//     data: orderData,
//   };

//   const payment = await orderUtils.makePayment(shurjopayPayload);

//   if (payment?.transactionStatus) {
//     order = await Order.create({
//       ...orderData,
//       transaction: {
//         id: payment.sp_order_id,
//         transactionStatus: payment.transactionStatus,
//       },
//     });
//   }

//   return { payment, order };
// };

const createOrderToDB = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string
) => {
  if (!payload?.products?.length) throw new Error("Order is not specified");

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Book.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    })
  );

  let order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: "user.address",
    customer_email: user.email,
    customer_phone: "user.phone",
    customer_city: "user.city",
    client_ip,
  };

  const payment = await orderUtils.makePayment(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPaymentDB = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPayment(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.method": verifiedPayment[0].method,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
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
        from: "books",
        foreignField: "_id",
        localField: "product",
        as: "bookData",
      },
    },
    // Step: 2
    // here the bookData is an array, we need to break the array to access its value
    //we can use $unwind to get each value of the array
    {
      $unwind: "$bookData",
    },
    // Step: 3
    // now we have the bookData object, we can access its value
    // using $project only the revenue and calculate using $multiply
    {
      $project: {
        revenue: { $multiply: ["$quantity", "$bookData.price"] },
      },
    },
    // Step: 4
    //we can group all the documents and sum there revenue using $sum
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$revenue" },
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
        totalRevenue: { $sum: "$totalPrice" },
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
  getAllOrdersFromDB,
  verifyPaymentDB,
};
