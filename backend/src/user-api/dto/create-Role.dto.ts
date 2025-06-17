import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/Role/role.enum';


export class CreateRoleDto {
  
    @IsEnum(Role)
    @IsNotEmpty()
    roleName: Role = Role.User; // Default role is User
}