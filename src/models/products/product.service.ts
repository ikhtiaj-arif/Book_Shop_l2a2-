import { Product } from "./products.model";
import { IProduct } from "./product.interface";

const createProductIntoDB = async(productData: IProduct) => {
    //established connection to the Product model to create data according to the models schema to the database
    const result = await Product.create(productData)
    return result
}

export const productServices = {
    createProductIntoDB
}