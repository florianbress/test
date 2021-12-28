import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  resetPasswordToken: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}
