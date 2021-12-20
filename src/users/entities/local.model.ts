import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType({ description: undefined })
export class Local {
  @Field((type) => Int)
  id: number;

  @Field()
  email: String;

  @Field()
  password: String;

  @Field()
  userId: String;

  @Field((type) => User)
  User?: User;
}
