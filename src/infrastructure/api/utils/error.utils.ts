import { BadRequestException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export function handleDatabaseError(error: Error): never {
  if (error instanceof QueryFailedError) {
    if (error.message.includes('unique constraint')) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: ['cuit must be unique'],
      });
    }

    if (error.message.includes('cuit')) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: ['cuit data too long for column. Max length is 11 numbers'],
      });
    }

    if (error.message.includes('name')) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: ['name data too long for column. Max length is 60 characters'],
      });
    }
  }

  // Handle custom error messages
  if (error.message.includes('Failed to save company')) {
    throw new BadRequestException({
      statusCode: 400,
      error: 'Bad Request',
      message: [error.message], // Use the custom error message
    });
  }

  // Re-throw the error if it doesn't match any known cases
  throw error;
}
