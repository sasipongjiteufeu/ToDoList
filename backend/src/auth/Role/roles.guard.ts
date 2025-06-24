import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
  // --- DEBUGGING LOGS ---
  console.log('--- RolesGuard Activated ---');

  const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);

  // --- DEBUGGING LOGS ---
  console.log('Required Roles:', requiredRoles);

  if (!requiredRoles) {
    console.log('No roles required. Access granted.');
    return true;
  }

  const { user } = context.switchToHttp().getRequest();

  // --- DEBUGGING LOGS ---
  console.log('User object from request:', user);

  if (!user || !user.roles) {
    console.log('Guard failed: User object or user.roles is missing.');
    return false;
  }
  const hasRequiredRole = requiredRoles.some((requiredRole) => user.roles.some((userRole) => userRole.name === requiredRole));
  // --- DEBUGGING LOGS ---
  console.log('Does user have required role?', hasRequiredRole);
   if (hasRequiredRole) {
    console.log('Access granted by RolesGuard.');
  } else {
    console.log('Access DENIED by RolesGuard.');
  }
  
  return hasRequiredRole;
  /*
  const hasRequiredRole = requiredRoles.some((role) => user.roles.includes(role));
   
  
  // --- DEBUGGING LOGS ---
  console.log('Does user have required role?', hasRequiredRole);
  
  if (hasRequiredRole) {
    console.log('Access granted by RolesGuard.');
  } else {
    console.log('Access DENIED by RolesGuard.');
  }

  return hasRequiredRole;*/
}
}