import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { AppAbility, Action, Subjects } from './types';

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');
      cannot(Action.Manage, User, { orgId: { $ne: user.orgId } }).because(
        'You can only manage users in your own organization',
      );
    } else {
      can(Action.Read, 'all');
      cannot(Action.Create, User).because('not admin!!!');
    }

    return build({
      detectSubjectType: (subject) =>
        subject.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
