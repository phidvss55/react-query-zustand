import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LikeType } from 'src/like/entities/like.model';
import { User } from 'src/user/entities/user.model';

@ObjectType()
export class PostType {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field()
  createdAt: Date;

  @Field()
  video: string;

  @Field(() => User)
  user?: User;

  @Field(() => [LikeType], { nullable: true })
  likes?: LikeType[];
}
