import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";
import { Season } from "../../seasons/entities/season.entity";
import { Team } from "../../teams/entities/team.entity";

@ObjectType()
export class SeasonRegistration {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Int, { nullable: false })
  seasonId!: number;

  @Field(() => String, { nullable: false })
  teamId!: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isValid!: boolean | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isCanceled!: boolean | null;

  @Field(() => Season, { nullable: false })
  Season?: Season;

  @Field(() => Team, { nullable: false })
  Team?: Team;
}
