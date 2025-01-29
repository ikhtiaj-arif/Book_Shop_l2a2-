import { Request, Response } from "express";
import { orderServices } from "./order.services";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";

const {
  createOrderToDB,
  getRevenueFromDB,
  getAllOrdersFromDB,
  verifyPaymentDB,
} = orderServices;

const createOrder = async (req: Request, res: Response) => {
  try {

    const orderData = req.body;
    const userPayload = req.user as JwtPayload; // Ensure type safety

    // Fetch user from DB using the ID from the token
    const user = await User.findById(userPayload.id); 

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: false,
      });
      return
    }
    
    const result = await createOrderToDB(user, orderData, req.ip!);
    res.status(200).json({
      message: "Order created successfully",
      status: true,
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name == "bookNotFound") {
      res.status(404).json({
        message: error._message,
        success: false,
        error: error.message || "Something went wrong",
      });
    } else if (error.name == "insufficientStock") {
      res.status(400).json({
        message: error._message,
        success: false,
        error: error.message || "Something went wrong",
      });
    } else {
      res.status(500).json({
        message: error._message,
        success: false,
        error: error || "Something went wrong",
      });
    }
  }
};

const verifyPayment = async (req: Request, res: Response) => {
  try {
    const order = await verifyPaymentDB(req.query.order_id as string);

    res.status(200).json({
      message: "Order verified successfully",
      status: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error.message || "Something went wrong",
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await getAllOrdersFromDB();
    res.status(200).json({
      message: "Orders collected successfully",
      status: true,
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error.message || "Something went wrong",
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await getRevenueFromDB();
    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error.message || "Something went wrong",
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
  getAllOrders,
  verifyPayment,
};
