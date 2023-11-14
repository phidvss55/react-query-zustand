import { Response, Request } from 'express';
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import RegisterDto from 'src/auth/dto/register.dto';
import { RegisterResponse } from 'src/auth/types/register-response.type';
import { LoginResponse } from 'src/auth/types/login-response.type';
import LoginDto from 'src/auth/dto/Login.dto';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { User } from './entities/user.model';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as FileUpload from 'graphql-upload/graphqlUploadExpress.js';
import { createWriteStream } from 'fs';

@Resolver()
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseFilters(GraphQLErrorFilter)
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password are not the same.',
      });
    }

    try {
      const { user } = await this.authService.register(
        registerDto,
        context.res,
      );
      console.log('user!', user);
      return { user };
    } catch (error) {
      // Handle the error, for instance if it's a validation error or some other type
      return {
        error: {
          message: error.message,
          // code: 'SOME_ERROR_CODE' // If you have error codes
        },
      };
    }
  }

  // Adjust this return type as needed
  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return await this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async updateUserProfile(
    @Context()
    context: { req: Request },
    @Args('fullname', { type: () => String, nullable: true }) fullname?: string,
    @Args('bio', { type: () => String, nullable: true }) bio?: string,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image?: GraphQLUpload,
  ) {
    console.log('image!', image, 'fullname!', fullname, 'bio!', bio);
    let imageUrl;
    if (image) {
      imageUrl = await this.storeImageAndGetURL(image);
    }
    return this.userService.updateProfile(context.req.user.sub, {
      fullname,
      bio,
      image: imageUrl,
    });
  }

  private async storeImageAndGetURL(file: GraphQLUpload): Promise<string> {
    const { createReadStream, filename } = await file;
    const fileData = await file;
    console.log('fileData!', fileData);

    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
    const readStream = createReadStream();

    readStream.pipe(createWriteStream(imagePath));

    return imageUrl; // Return the appropriate URL where the file can be accessed
  }
}
