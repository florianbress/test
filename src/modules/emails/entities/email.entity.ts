import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { EmailType } from "../enums/email-type.enum";

@ObjectType()
export class Email {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => EmailType, { nullable: false })
  type!: keyof typeof EmailType;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isOpened!: boolean | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => User, { nullable: false })
  User?: User;
}
