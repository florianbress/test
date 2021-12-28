import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Organization } from "./organization.entity";

@ObjectType()
export class OrganizationInvitation {
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

  @Field(() => Organization, { nullable: false })
  Organization?: Organization;

  @Field(() => User, { nullable: false })
  User?: User;
}
