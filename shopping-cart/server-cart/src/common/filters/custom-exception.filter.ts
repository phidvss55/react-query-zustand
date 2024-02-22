import { ApolloError } from 'apollo-server-express';
import { BadRequestException, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(BadRequestException)
export class GraphqlErrorFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException) {
    console.log('Exception in GraphqlErrorFilter', exception);
    const response = exception.getResponse();

    if (typeof response === 'object') {
      // directly throw apolloerror with the repsonse object
      throw new ApolloError('Validation error', 'VALIDATION_ERROR', response);
    } else {
      throw new ApolloError('Error: BAD_REQUEST');
    }
  }
}
