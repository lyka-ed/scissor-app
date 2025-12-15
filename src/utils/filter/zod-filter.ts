import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';

@Catch(ZodValidationException)
export class ZodFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const zodError = exception.getZodError() as ZodError;
    const rawErrors = zodError.issues;

    const simplifiedErrors = rawErrors.map((error) => ({
      path: error.path,
      message: error.message,
    }));

    response.status(400).json({
      statusCode: 400,
      message: 'Validation failed',
      errors: simplifiedErrors,
    });
  }
}
