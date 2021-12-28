import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";

@ObjectType()
export class EpicGames {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  token!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  userId!: string | null;

  @Field(() => User, { nullable: true })
  User?: User | null;
}
