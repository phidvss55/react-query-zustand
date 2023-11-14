import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Comment } from './entities/comment.model';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query((returns) => [Comment])
  async getCommentsByPostId(@Args('postId') postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation((returns) => Comment)
  createComment(
    @Args('postId') postId: number,
    @Args('text') text: string,
    @Context() ctx: { req: Request },
  ) {
    return this.commentService.createComment({
      text: text,
      user: { connect: { id: ctx.req.user.sub } },
      post: { connect: { id: postId } },
    });
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Comment)
  deleteComment(@Args('id') id: number, @Context() ctx: { req: Request }) {
    return this.commentService.deleteComment(id, ctx.req.user.sub);
  }
}
