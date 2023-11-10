import {
  HttpStatus,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ValidationError } from 'class-validator';
import * as iterare from 'iterare';

export class AppValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions) {
    super(options);
  }

  createExceptionFactory() {
    return (validationErrors = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[HttpStatus.UNPROCESSABLE_ENTITY]();
      }
      const errors = this.processErrors(validationErrors);
      return new HttpErrorByCode[HttpStatus.UNPROCESSABLE_ENTITY](errors);
    };
  }

  processErrors(validationErrors: ValidationError[]) {
    const processedError = iterare
      .iterate(validationErrors)
      .map((error) => this.mapChildrenToValidationErrors(error))
      .flatten()
      .filter((item) => !!item.constraints)
      .map((item) => {
        return { [item.property]: Object.values(item.constraints) };
      })
      .toArray();

    let errors = {};
    for (const error of processedError) {
      errors = { ...errors, ...error };
    }
    return {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Dữ liệu không hợp lệ.',
      errors,
    };
  }
}
