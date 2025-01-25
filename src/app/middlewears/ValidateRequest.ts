import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/CatchAsync';


const ValidateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //!creating schema validation using zod
    await schema.parseAsync({
      body: req.body,
     
    });
    next();
  });
};

export default ValidateRequest;
