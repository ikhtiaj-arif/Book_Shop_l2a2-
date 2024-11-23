import cors from 'cors';
import express, { Request, Response } from 'express';

import { orderRoutes } from './models/orders/order.routes';
import { productsRoutes } from './models/products/products.routes';

const app = express();

//parsers
app.use(express.json());
app.use(cors());

//example of controller function
const baseController = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

//here the routes of products are separated to product routes
app.use('/api', productsRoutes);
app.use('/api', orderRoutes);

app.get('/', baseController);

export default app;
