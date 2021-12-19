import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepo: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.UserRepo.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.UserRepo.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.UserRepo.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.UserRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.UserRepo.delete(id);
  }
}

//Fill the above functions, use UserEntity as return !
//Create frontend/src/api/user with a ResponseUserDto that is similar to UserEntity in properties, also copy the other dtos (create(without id) and update(partial of create)) !
//Call the already existing functions that lie in the controller from the frontend/api/user !
