import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserApiDto } from 'src/user-api/dto/create-user-api.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: CreateUserApiDto) {
        if (!signInDto.username && !signInDto.password) {
            throw new Error('Username and password are required for login');
        } 
        else if (signInDto.username && !signInDto.password) {
            throw new Error('Password is required for login');
        }
        else if (signInDto.username && signInDto.password) {
            return this.authService.signIn(signInDto.username, signInDto.password);
        }
        throw new Error('Invalid login credentials');
    }

}
