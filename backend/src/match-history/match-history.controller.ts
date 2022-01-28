import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';
import { CreateMatchHistoryDto } from './dto/create-match-history.dto';
import { UpdateMatchHistoryDto } from './dto/update-match-history.dto';

@Controller('match-history')
export class MatchHistoryController {
  constructor(private readonly matchHistoryService: MatchHistoryService) {}

  @Post()
  create(@Body() createMatchHistoryDto: CreateMatchHistoryDto) {
    this.matchHistoryService.create(createMatchHistoryDto);
  }

  @Get()
  findAll() {
    return this.matchHistoryService.findAll();
  }

  @Get('/user/:login')
  findMatchHistoryOfUser(@Param('login') login: string) {
    return this.matchHistoryService.findMatchHistoryOfUser(login);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matchHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatchHistoryDto: UpdateMatchHistoryDto) {
    this.matchHistoryService.update(+id, updateMatchHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.matchHistoryService.remove(+id);
  }
}
