import {BadRequestException, Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { User } from '../users/user.entity'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { UserService } from '../users/user.service'
import { AuthUser } from '../decorators/auth.user.decorator'
import {CreateUserDto} from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request): Promise<{ accessToken: string }> {
    return this.authService.generateJwtToken(request.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async myProfile(@Request() request, @AuthUser() authUser): Promise<any> {
    const user = await this.userService.findById(authUser.sub)

    return {
      ...plainToClass(User, user),
      authUser,
    }
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { email, password, password_confirmation } = createUserDto;

    // Check if password matches the confirmation
    if (password !== password_confirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if the email is already registered
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    // Create the new user with the hashed password
    const newUser = await this.userService.register({
      ...createUserDto,
      password: password, // store hashed password
    });

    // Generate JWT token for the new user
    return await this.authService.generateJwtToken(newUser);
  }
}
