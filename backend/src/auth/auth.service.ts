import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserApiService } from 'src/user-api/user-api.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserApiService,
        private jwtService: JwtService) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.Login_User({
            username, password: pass,
            email: '',
            
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        //const { password, ...result } = user;
        const payload = { sub: user.id, username: user.username };
        const token = await this.jwtService.signAsync(payload);
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            access_token: token
        };
        
    }
}
