import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: "Invalid characters" })
  username: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: "Invalid E-mail" })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
