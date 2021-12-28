import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
