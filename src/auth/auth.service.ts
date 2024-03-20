import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password.toString());
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'user already exists',
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      }
    }
  }
}
