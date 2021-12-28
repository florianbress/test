import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Team } from "./team.entity";

@ObjectType()
export class TeamInviteCode {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  teamId!: string;

  @Field(() => Team, { nullable: false })
  team?: Team;

  @Field(() => String, { nullable: false })
  code!: string;
}
