import { ForbiddenError } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AbilityFactory } from '../ability/ability.factory';
import { Action } from '../ability/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly abilityFactory: AbilityFactory) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    // return `This action returns a #${id} user`;

    const user = new User();
    user.id = id;
    user.isAdmin = false;
    user.orgId = 1;

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto, user: User) {
    const userToUpdate = this.findOne(+id);
    const ability = this.abilityFactory.defineAbility(user);

    ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
