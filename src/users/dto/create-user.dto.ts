import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
