import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";

@ObjectType()
export class Auth {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
