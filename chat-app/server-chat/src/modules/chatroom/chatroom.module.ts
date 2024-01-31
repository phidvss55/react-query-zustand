import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    ChatroomResolver,
    ChatroomService,
    ConfigService,
    PrismaService,
    UserService,
    JwtService,
  ],
})
export class ChatroomModule {}
