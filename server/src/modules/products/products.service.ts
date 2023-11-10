import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Product from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { ListProductsDto } from '../students/dto/listing.dto';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private readonly studentRepo: Repository<Product>;

  private dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  findAll(dto: ListProductsDto) {
    const take = Number(dto.limit) || 10;
    const page = Number(dto.skip) || 1;
    const skip = (page - 1) * take;

    return this.studentRepo.findAndCount({
      skip: skip,
      take: Number(dto.limit || 10),
    });
  }

  async fakeProducts(dataSize = 20): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i <= dataSize; i++) {
        const data = {
          category: faker.commerce.productAdjective(),
          description: faker.commerce.productDescription(),
          title: faker.commerce.productName(),
        };

        const newEntity = this.studentRepo.create(data);
        await this.studentRepo.save(newEntity);
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
}
