import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { OrganizationRole } from "../enums/organization-role.enum";
import { Organization } from "./organization.entity";

@ObjectType()
export class OrganizationMembership {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  organizationId!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => OrganizationRole, { nullable: false, defaultValue: "Member" })
  role!: keyof typeof OrganizationRole;

  @Field(() => Organization, { nullable: false })
  Organization?: Organization;

  @Field(() => User, { nullable: false })
  User?: User;
}
