import { ForbiddenError } from '@casl/ability';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';
import { AbilityFactory } from '../ability.factory';
import { CHECK_ABILITY } from '../decorators/abilities.decorator';
import { RequiredRule } from '../types';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

      const user: User = { id: 1, isAdmin: false, orgId: 1 }; // mock user
    // const user = context.switchToHttp().getRequest();

    const ability = this.abilityFactory.defineAbility(user);
    rules.forEach(({ action, subject }) =>
      ForbiddenError.from(ability).throwUnlessCan(action, subject),
    );

    return true;
  }
}
