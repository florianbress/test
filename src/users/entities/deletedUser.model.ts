import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType({ description: undefined })
export class DeletedUser {
  @Field((type) => Int)
  id: number;

  @Field()
  username: String;

  @Field()
  userId: String;

  @Field((type) => User)
  User?: User;
}
