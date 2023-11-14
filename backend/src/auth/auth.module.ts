import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstant } from './jwt/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstant.secret,
      global: true,
    }),
  ],
  providers: [AuthService, PrismaService, ConfigService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
