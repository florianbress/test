import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";
import { Division } from "../../divisions/entities/division.entity";
import { Match } from "../../matches/entities/match.entity";
import { Roster } from "../../rosters/entities/roster.entity";
import { Team } from "../../teams/entities/team.entity";

@ObjectType()
export class DivisionGroup {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Int, { nullable: false })
  divisionId!: number;

  @Field(() => Int, { nullable: true })
  order!: number | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Division, { nullable: false })
  Division?: Division;

  @Field(() => [Roster], { nullable: true })
  Roster?: Array<Roster>;

  @Field(() => [Match], { nullable: true })
  Match?: Array<Match>;

  @Field(() => [Team], { nullable: true })
  Team?: Array<Team>;
}
