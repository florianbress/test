import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { DivisionGroup } from "../../division-groups/entities/division-group.entity";
import { Season } from "../../seasons/entities/season.entity";
import { Team } from "../../teams/entities/team.entity";

@ObjectType()
export class Division {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Int, { nullable: false })
  seasonId!: number;

  @Field(() => Int, { nullable: true })
  order!: number | null;

  @Field(() => Int, { nullable: true })
  numberOfRounds!: number | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Season, { nullable: false })
  Season?: Season;

  @Field(() => [Team], { nullable: true })
  Team?: Array<Team>;

  @Field(() => [DivisionGroup], { nullable: true })
  DivisionGroup?: Array<DivisionGroup>;
}
