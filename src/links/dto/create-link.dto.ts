import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .min(1, 'URL is required')
    .url({ message: 'Must be a valid URL' }),

  alias: z
    .string()
    .trim()
    .min(3, 'Custom URL must be at least 3 characters')
    .max(20, 'Custom URL is too long')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Custom URL can only contain letters, numbers, and hyphens',
    )
    .optional(),
});

export class CreateLinkDto extends createZodDto(CreateLinkSchema) {}
