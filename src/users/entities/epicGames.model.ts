import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType({ description: undefined })
export class EpicGames {
  @Field((type) => Int)
  id: number;

  @Field()
  token: String;

  @Field()
  name: String;

  @Field()
  email: String;

  @Field()
  userId: String;

  @Field((type) => User)
  User?: User;
}
