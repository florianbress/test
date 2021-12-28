import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { UserRole } from "../../users/enums/user-role.enum";
import { Team } from "./team.entity";

@ObjectType()
export class TeamMembership {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  teamId!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => UserRole, { nullable: false, defaultValue: "Member" })
  role!: keyof typeof UserRole;

  @Field(() => Team, { nullable: false })
  Team?: Team;

  @Field(() => User, { nullable: false })
  User?: User;
}
