import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserApiDto } from 'src/user-api/dto/create-user-api.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto : CreateUserApiDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    
}
