import { Request, Response } from 'express';
import { orderServices } from './order.services';

const { createOrderToDB, getRevenueFromDB } = orderServices;

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await createOrderToDB(orderData);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name == 'bookNotFound') {
      res.status(404).json({
        message: error._message,
        success: false,
        error: error.message || 'Something went wrong',
      });
    } else if (error.name == 'insufficientStock') {
      res.status(400).json({
        message: error._message,
        success: false,
        error: error.message || 'Something went wrong',
      });
    } else {
      res.status(500).json({
        message: error._message,
        success: false,
        error: error || 'Something went wrong',
      });
    }
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await getRevenueFromDB();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error.message || 'Something went wrong',
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
};
