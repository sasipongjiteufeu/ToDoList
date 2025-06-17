import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the custom @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get the user object from the request (attached by a previous guard, e.g., JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // If there's no user, deny access (should be handled by AuthGuard, but good to be safe)
    if (!user || !user.roles) {
        return false;
    }
    
    // Check if the user's roles include at least one of the required roles
    // The `user.roles` is an array of RoleEntity objects, so we map it to an array of role names
    const userRoles = user.roles.map((role) => role.name);
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}