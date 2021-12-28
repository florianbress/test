import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LoginResult } from "../enums/login-result.enum";

@ObjectType()
export class LoginRequest {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: true })
  identifier!: string | null;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  ip!: string;

  @Field(() => LoginResult, { nullable: false })
  result!: keyof typeof LoginResult;
}
