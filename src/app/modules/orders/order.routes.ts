import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();
const { createOrder, getRevenue } = orderController;

router.post('/', createOrder);
router.get('/revenue', getRevenue);

export const orderRoutes = router;
