import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";


@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
    @Context("req") req: any
  ) {
    return this.usersService.create(createUserInput, req);
  }
}
