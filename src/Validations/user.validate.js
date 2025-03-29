import z from "zod";

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "minLengthErrorMessage" })
  .max(20, { message: "maxLengthErrorMessage" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "uppercaseErrorMessage",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "lowercaseErrorMessage",
  })
  .refine((password) => /[0-9]/.test(password), { message: "numberErrorMessage" })
  .refine((password) => /[!@#$%^&*_()+-]/.test(password), {
    message: "specialCharacterErrorMessage",
  });

export const registerSchema = z.object({
  username: z.string().trim().nonempty("Username is empty"),
  email: z.string().trim().nonempty("email is empty").email("email required"),
  fullname: z.string().trim().nonempty("fullname is empty"),
  password: passwordSchema
});

export const loginSchema = z.object({
  email: z.string().trim().nonempty("email is empty").email("email required").optional(),
  username : z.string().trim().nonempty("Username is empty").optional(),
  password: passwordSchema
});

