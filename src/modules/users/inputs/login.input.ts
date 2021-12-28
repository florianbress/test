import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
