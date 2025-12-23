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
    .min(3, 'Alias must be at least 3 characters')
    .max(20, 'Alias is too long')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Alias can only contain letters, numbers, and hyphens',
    )
    .optional(),
});

export class CreateLinkDto extends createZodDto(CreateLinkSchema) {}
