
import { Order } from "./order.model";
import { IOrder } from "./order.interface";

const createOrderToDB = async(orderData:IOrder) => {
    const result = await Order.create(orderData)
    return result
}

export const orderServices = {
    createOrderToDB
}