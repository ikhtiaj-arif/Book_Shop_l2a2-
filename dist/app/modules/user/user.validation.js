"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .max(30, { message: "Name cannot be more than 30 characters" })
            .regex(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
            message: "Name must be in capitalize format (e.g., 'John Doe')",
        }),
        password: zod_1.z.string({ required_error: " Password is required" }),
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email({ message: "Email must be a valid email address" }),
    }),
    role: zod_1.z.enum(["admin", "user"]).default("user"),
    isBlocked: zod_1.z.boolean().optional().default(false),
});
exports.userValidations = {
    createUserValidationSchema,
};
