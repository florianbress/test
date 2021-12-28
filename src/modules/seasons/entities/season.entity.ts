import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";
import { Division } from "../../divisions/entities/division.entity";
import { SeasonRegistration } from "../../season-registrations/entities/season-registration.entity";

@ObjectType()
export class Season {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  publicationDate!: Date | null;

  @Field(() => Date, { nullable: true })
  registrationStart!: Date | null;

  @Field(() => Date, { nullable: true })
  registrationEnd!: Date | null;

  @Field(() => Date, { nullable: true })
  leagueStart!: Date | null;

  @Field(() => Date, { nullable: true })
  leagueEnd!: Date | null;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  matchWeekLength!: number | null;

  @Field(() => [SeasonRegistration], { nullable: true })
  SeasonRegistration?: Array<SeasonRegistration>;

  @Field(() => [Division], { nullable: true })
  Division?: Array<Division>;
}
