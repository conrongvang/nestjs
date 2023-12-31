import { RolesEnum } from '../../../consts/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: RolesEnum[]) => SetMetadata('roles', roles);
