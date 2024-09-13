import z from 'zod'

const createUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
      invalid_type_error: 'Name must be a string!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
        invalid_type_error: 'Email must be a string!',
      })
      .email('Invalid email format!'),
    password: z
      .string({
        required_error: 'Password is required!',
        invalid_type_error: 'Password must be a string!',
      })
      .min(6, 'Password must be at least 6 characters long!'),
    phone: z
      .string({
        required_error: 'Phone number is required!',
        invalid_type_error: 'Phone must be a string!',
      })
      .min(10, 'Phone number must be at least 10 digits long!'),
    role: z.enum(['admin', 'user'], {
      required_error: 'Role is required!',
      invalid_type_error: "Role must be either 'admin' or 'user'!",
    }),
    address: z.string({
      required_error: 'Address is required!',
      invalid_type_error: 'Address must be a string!',
    }),
  }),
})

export const UserValidation = {
  createUserValidation,
}
