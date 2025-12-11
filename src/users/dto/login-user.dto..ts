import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class LoginUserDto extends createZodDto(LoginUserSchema) {}
