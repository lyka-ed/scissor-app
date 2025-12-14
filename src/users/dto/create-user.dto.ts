import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// --- HELPER FUNCTION ---
// This creates a standard required string validation
// It handles "empty" strings and removes whitespace automatically.
const requiredString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` });

// --- SCHEMA DEFINITION ---
export const CreateUserSchema = z.object({
  // 1. Email
  // We chain .email() onto our helper
  email: requiredString('Email')
    .toLowerCase()
    .email({ message: 'Invalid email address format' }),

  // 2. Names
  // We chain .min(2) onto our helper for length checks
  firstName: requiredString('First name').min(2, {
    message: 'First name must be at least 2 characters',
  }),

  lastName: requiredString('Last name').min(2, {
    message: 'Last name must be at least 2 characters',
  }),

  // 3. Password
  // Keep complex logic separate for readability
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
