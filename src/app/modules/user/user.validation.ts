import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .max(30, { message: "Name cannot be more than 30 characters" })
      .regex(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
        message: "Name must be in capitalize format (e.g., 'John Doe')",
      }),
    password: z.string({ required_error: " Password is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email must be a valid email address" }),
  }),
  role: z.enum(["admin", "user"]).default("user"),
  isBlocked: z.boolean().optional().default(false),
});

export const userValidations = {
  createUserValidationSchema,
};
