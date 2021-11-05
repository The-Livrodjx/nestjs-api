import { Body, Controller, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller()
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('/login')
    async login(@Body() body: any){
        const {email, password} = body
        return this.authService.login(email, password);
    }
}