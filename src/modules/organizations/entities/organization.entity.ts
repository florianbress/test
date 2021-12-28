import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Team } from "../../teams/entities/team.entity";
import { User } from "../../users/entities/user.entity";
import { OrganizationInvitation } from "./organization-invitation.model";
import { OrganizationMembership } from "./organization-membership.model";

@ObjectType()
export class Organization {
  @Field(() => ID, { nullable: false })
  uuid!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  tag!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => User, { nullable: false })
  Admin?: User;

  @Field(() => [OrganizationMembership], { nullable: true })
  OrganizationMembership?: Array<OrganizationMembership>;

  @Field(() => [OrganizationInvitation], { nullable: true })
  OrganizationInvitation?: Array<OrganizationInvitation>;

  @Field(() => [Team], { nullable: true })
  Teams?: Array<Team>;
}
