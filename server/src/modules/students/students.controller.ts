import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDataWithPaging, ResponseData } from '@common/response.util';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './students.service';
import { ListStudentsDto } from './dto/listing.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Response as Res } from 'express';

@ApiTags('Student')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll(@Query() dto: ListStudentsDto, @Response() res: Res) {
    const data = await this.studentService.findAll(dto);

    res.set({ 'x-total-count': data[1] });
    const responseData = new ResponseDataWithPaging(
      200,
      data[0],
      Number(dto._page) || 1,
      data[1],
    );
    return res.json(responseData);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateStudentDto) {
    const res = await this.studentService.create(createCategoryDto);
    return new ResponseData(201, res);
  }

  @Post('fake-students')
  async fakeStudents() {
    await this.studentService.fakeStudents();
    return new ResponseData(201, 'Done');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.studentService.findOne(+id);
    return new ResponseData(200, data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateStudentDto) {
    const data = await this.studentService.update(+id, updateDto);
    return new ResponseData(200, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.studentService.remove(+id);
    return new ResponseData(200, res);
  }
}
