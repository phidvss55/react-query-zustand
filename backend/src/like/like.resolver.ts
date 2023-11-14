import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { LikeType } from './entities/like.model';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Request } from 'express';

@Resolver(() => LikeType)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => LikeType)
  @UseGuards(GraphqlAuthGuard)
  async likePost(
    @Args('postId') postId: number,
    @Context() ctx: { req: Request },
  ) {
    return this.likeService.likePost({
      userId: ctx.req.user.sub,
      postId: postId,
    });
  }

  @Mutation(() => LikeType)
  @UseGuards(GraphqlAuthGuard)
  async unlikePost(
    @Args('postId') postId: number,
    @Context() ctx: { req: Request },
  ) {
    return this.likeService.unlikePost(postId, ctx.req.user.sub);
  }
}
