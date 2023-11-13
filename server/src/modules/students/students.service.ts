import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import Student from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { faker } from '@faker-js/faker';
import { ListStudentsDto } from './dto/listing.dto';
import { StudentNotFoundException } from './exceptions/not-found.exception';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>;

  private dataSource: DataSource;
  constructor(private dataSource1: DataSource) {
    this.dataSource = dataSource1;
  }

  async create(studentDto: CreateStudentDto) {
    const newEntity = this.studentRepository.create(studentDto);
    await this.studentRepository.save(newEntity);
    return newEntity;
  }

  async fakeStudents(dataSize = 100): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i <= dataSize; i++) {
        const data = {
          last_name: faker.person.lastName(),
          first_name: faker.person.firstName(),
          gender: faker.phone.number(),
          country: faker.location.country(),
          email: faker.internet.email(),
          avatar: null,
          btc_address: faker.location.secondaryAddress(),
        };

        const newEntity = this.studentRepository.create(data);

        await this.studentRepository.save(newEntity);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error', error);
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(dto: ListStudentsDto) {
    const take = Number(dto._limit) || 10;
    const page = Number(dto._page) || 1;
    const skip = (page - 1) * take;

    return this.studentRepository.findAndCount({
      order: {
        id: 'DESC',
      },
      skip: skip,
      take: Number(dto._limit || 10),
    });
  }

  async findOne(id: number): Promise<Student> {
    const cate = await this.studentRepository.findOne({
      where: { id },
    });
    if (!cate) {
      throw new StudentNotFoundException(id);
    }
    return cate;
  }

  async update(id: number, dto: UpdateStudentDto) {
    const updatedCategory = await this.studentRepository.findOne({
      where: { id },
    });

    if (!updatedCategory) {
      throw new StudentNotFoundException(id);
    }

    await this.studentRepository.update(id, dto);
    return updatedCategory;
  }

  async remove(id: number) {
    const deleteResponse = await this.studentRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new StudentNotFoundException(id);
    }
    return 'Post is deleted';
  }
}
