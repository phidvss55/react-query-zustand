import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentNotFoundException extends HttpException {
  constructor(id: string | number) {
    super(`Student with id = ${id} is not found`, HttpStatus.NOT_FOUND);
  }
}
