import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { RolesEnum } from '../consts/roles.enum';
import { DatabaseService } from './database.service';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class AccountDatabaseService extends DatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
  ) {
    super(AccountDatabaseService.name);
  }

  async createAccount(userEnt: UserEntity) {
    return await this.userRepository.save(userEnt);
  }

  async saveAccount(userEnt: UserEntity) {
    return await this.userRepository.save(userEnt);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteUser(id: string) {
    const existing = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (existing) {
      return await this.userRepository.delete(existing.id);
    } else {
      throw new NotFoundException(`Employee with Id '${id}' not found.`);
    }
  }

  async getUsersByRoles(role: RolesEnum[]) {
    const users = await this.userRepository.find();
    return users;
  }

  async truncateUsers() {
    return await this.userRepository.clear();
  }
}
