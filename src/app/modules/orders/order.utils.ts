import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay";
import config from "../../config";

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!
);

const makePayment = async (payload: any): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      payload,
      (res) => resolve(res),
      (error) => reject(error)
    );
  });
};

const verifyPayment = async (
  order_id: string
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (res) => resolve(res),
      (err) => reject(err)
    );
  });
};

export const orderUtils = { makePayment, verifyPayment };
