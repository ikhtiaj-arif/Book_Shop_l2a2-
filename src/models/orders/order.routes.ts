import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();
const { createOrder, getRevenue } = orderController;

router.post('/orders', createOrder);
router.get('/orders/revenue', getRevenue);

export const orderRoutes = router;
