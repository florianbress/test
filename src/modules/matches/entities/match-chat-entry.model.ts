import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Match } from "./match.entity";

@ObjectType()
export class MatchChatEntry {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Int, { nullable: false })
  matchId!: number;

  @Field(() => String, { nullable: false })
  Content!: string;

  @Field(() => User, { nullable: false })
  User?: User;

  @Field(() => Match, { nullable: false })
  Match?: Match;
}
