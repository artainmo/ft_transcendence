import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DmsService } from './dms.service';
import { CreateDmDto } from './dto/create-dm.dto';
import { UpdateDmDto } from './dto/update-dm.dto';
import { CreateDmMessageDto } from './dto/create-dm_message.dto';
import { UpdateDmMessageDto } from './dto/update-dm_message.dto';

@Controller('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @Post()
  create(@Body() createDmDto: CreateDmDto) {
    return this.dmsService.create(createDmDto);
  }

  @Get()
  findAll() {
    return this.dmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dmsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDmDto: UpdateDmDto) {
    this.dmsService.update(+id, updateDmDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.dmsService.remove(+id);
  }

  @Post('/message')
  createMessage(@Body() createDmMessageDto: CreateDmMessageDto) {
    this.dmsService.createMessage(createDmMessageDto);
  }

  @Get('/message')
  findAllMessages() {
    return this.dmsService.findAllMessages();
  }

  @Get('/message/:id')
  findOneMessage(@Param('id', ParseIntPipe) id: number) {
    return this.dmsService.findOneMessage(+id);
  }

  @Patch('/message/:id')
  updateMessage(@Param('id', ParseIntPipe) id: number, @Body() updateDmMessageDto: UpdateDmMessageDto) {
    this.dmsService.updateMessage(+id, updateDmMessageDto);
  }

  @Delete('/message/:id')
  removeMessage(@Param('id', ParseIntPipe) id: number) {
    this.dmsService.removeMessage(+id);
  }
}
