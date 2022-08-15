import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory } from '../ability/ability.factory';
import { User } from './entities/user.entity';
import { CheckAbilities } from '../ability/decorators/abilities.decorator';
import { Action } from '../ability/types';
import { AbilitiesGuard } from '../ability/guards/abilities.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: User })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User = { id: 1, isAdmin: false, orgId: 1 }; // mock user

    return this.usersService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
