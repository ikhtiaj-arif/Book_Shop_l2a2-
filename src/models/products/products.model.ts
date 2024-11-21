import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const userSchema = new Schema<IProduct>({
    name: { type: String, required: true }
   
  });
  
  // 3. Create a Model.
  export const Product = model<IProduct>('Products', userSchema);