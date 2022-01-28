import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
const speakeasy = require('speakeasy');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepo: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
      return await this.UserRepo.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.UserRepo.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.UserRepo.findOne(id);
  }

  async findCompleteOne(id: number): Promise<UserEntity> {
    return await this.UserRepo.findOne(id, {
      relations: ['matchHistory', 'friends', 'dms', 'channels']
    });
  }

  async findOneByName(name: string): Promise<UserEntity> {
    return await this.UserRepo.findOne({ where: { name: name }});
  }

  async findOneByLogin(login: string): Promise<UserEntity> {
    return await this.UserRepo.findOne({ where: { login: login }});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.UserRepo.update(id, updateUserDto);
  } //"TypeORM bug: Cannot query across many-to-many for property channels" | .update method often bugs and does not return, .save may be a better alternative

  async remove(id: number): Promise<void> {
    await this.UserRepo.delete(id);
  }

  twoFactorAuthenticationSecret(): any {
    return speakeasy.generateSecret({ name: 'Pong Game' });
  }

  verifyTwoFactorAuthentication(secret: string, token: string): boolean {
    const res = speakeasy.totp.verify({
      secret: secret,
      encoding: 'ascii',
      token: token
    });
    return res;
  }
}
