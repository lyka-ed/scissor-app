import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .url({ message: 'Please provide a valid URL (e.g. https://google.com)' }),

  customName: z
    .string()
    .trim()
    .min(3, 'Custom name must be at least 3 characters')
    .max(20, 'Custom name is too long')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Name can only contain letters, numbers, and hyphens',
    )
    .optional(),

  generateQr: z.boolean().optional().default(false),
});

export class CreateLinkDto extends createZodDto(CreateLinkSchema) {}
