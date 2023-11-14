import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    AuthService,
    JwtService,
    ConfigService,
    PrismaService,
  ],
})
export class UserModule {}
