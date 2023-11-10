import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Student from './entities/student.entity';
import { StudentService } from './students.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentService],
  imports: [TypeOrmModule.forFeature([Student])],
})
export class StudentsModule {}
