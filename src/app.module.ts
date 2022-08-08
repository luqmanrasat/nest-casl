import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AbilityModule } from './ability/ability.module';
import { APP_FILTER } from '@nestjs/core';
import { ForbiddenAbilityFilter } from './ability/filters/forbidden-ability.filter';

@Module({
  imports: [UsersModule, AbilityModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ForbiddenAbilityFilter,
    },
  ],
})
export class AppModule {}
