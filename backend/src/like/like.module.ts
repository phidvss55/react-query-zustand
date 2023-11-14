import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    LikeResolver,
    LikeService,
    PrismaService,
    ConfigService,
    GraphqlAuthGuard,
    JwtService,
  ],
})
export class LikeModule {}
