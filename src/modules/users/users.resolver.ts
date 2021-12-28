import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlCurrentUser } from "../auth/decerators/gql-current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { LoginResponse } from "./entities/login-response.type";
import { User } from "./entities/user.entity";
import { ChangePasswordInput } from "./inputs/change-password.input";
import { ForgotPasswordInput } from "./inputs/forgot-password.input";
import { LoginInput } from "./inputs/login.input";
import { ResetPasswordInput } from "./inputs/reset-password.input";
import { UserCreateInput } from "./inputs/user-create-input";
import { UserUpdateInput } from "./inputs/user-update.input";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@GqlCurrentUser() user: User) {
    // make sure user is logged in
    if (!user) {
      throw new Error("You are not authenticated!");
    }

    // user is authenticated
    return user;
  }

  @Mutation(() => User)
  createUser(@Args("userCreateInput") userCreateInput: UserCreateInput) {
    return this.usersService.createUser(userCreateInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  users() {
    return this.usersService.getUsers();
  }

  @Query(() => User, { nullable: true })
  user(@Args("username", { type: () => String }) username: string) {
    return this.usersService.getUser(username);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args("uuid") uuid: string,
    @Args("userUpdateInput") userUpdateInput: UserUpdateInput
  ) {
    return this.usersService.updateUser(uuid, userUpdateInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  updateAvatar(@Args("uuid") uuid: string, @Args("file") file: string) {
    return this.usersService.updateAvatar(uuid, file);
  }

  @Mutation(() => User)
  removeUser(@Args("uuid", { type: () => String }) uuid: string) {
    return this.usersService.deleteUser(uuid);
  }

  @Query(() => Boolean)
  checkUsernameAvailibility(@Args("username") username: string) {
    return this.usersService.checkUsernameAvailibility(username);
  }

  @Query(() => Boolean)
  checkEmailAvailibility(@Args("email") email: string) {
    return this.usersService.checkEmailAvailibility(email);
  }

  @Mutation(() => Boolean)
  verifyEmail(@Args("emailToken") emailToken: string) {
    return this.usersService.verifyEmail(emailToken);
  }

  @Mutation(() => LoginResponse)
  login(@Args("loginInput") loginInput: LoginInput) {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => Boolean)
  changePassword(
    @Args("changePasswordDto") changePasswordInput: ChangePasswordInput
  ) {
    return this.usersService.changePassword(changePasswordInput);
  }

  @Mutation(() => Boolean)
  forgotPassword(
    @Args("forgotPasswordDto") forgotPasswordInput: ForgotPasswordInput
  ) {
    return this.usersService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => Boolean)
  resetPassword(@Args("resetPassword") resetPasswordInput: ResetPasswordInput) {
    return this.usersService.resetPassword(resetPasswordInput);
  }
}
