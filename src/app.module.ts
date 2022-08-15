import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AbilityModule } from './ability/ability.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ForbiddenAbilityFilter } from './ability/filters/forbidden-ability.filter';
import { AbilitiesGuard } from './ability/guards/abilities.guard';

@Module({
  imports: [UsersModule, AbilityModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ForbiddenAbilityFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard,
    },
  ],
})
export class AppModule {}
