import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseData, ResponseDataWithPaging } from '@common/response.util';
import { ListProductsDto } from '../students/dto/listing.dto';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() dto: ListProductsDto) {
    const data = await this.productsService.findAll(dto);
    return new ResponseDataWithPaging(
      200,
      data[0],
      Number(dto.skip) || 1,
      data[1],
    );
  }

  @Post()
  async fakeData() {
    const res = await this.productsService.fakeProducts();
    return new ResponseData(201, res);
  }
}
