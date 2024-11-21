import { Request, Response } from 'express';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  //passed the client data to the services function to handle the database actions
  const result = await productServices.createProductIntoDB(productData);

  if (result) {
    res.status(200).json({
      success: true,
      message: 'hello world',
      data: productData,
    });
    console.log(productData);
  }
};

export const productControllers = {
  createProduct,
};
