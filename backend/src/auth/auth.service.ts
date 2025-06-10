import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserApiService } from 'src/user-api/user-api.service';


@Injectable()
export class AuthService {
    constructor(private userService: UserApiService) {}

    async signIn(username: string, pass: string) : Promise<any> {
        const user = await this.userService.Login_User({
            username, password : pass,
            email: ''
        });
        if (!user){
            throw new UnauthorizedException();
        }
         const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return user;
    }
}
