import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// --- HELPER FUNCTION ---
const requiredString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` });

export const CreateUserSchema = z.object({
  email: requiredString('Email')
    .toLowerCase()
    .email({ message: 'Invalid email address format' }),
  firstName: requiredString('First name').min(2, {
    message: 'First name must be at least 2 characters',
  }),
  lastName: requiredString('Last name').min(2, {
    message: 'Last name must be at least 2 characters',
  }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
