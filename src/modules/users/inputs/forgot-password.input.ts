import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ForgotPasswordInput {
  @Field()
  username: string;

  @Field()
  pinCode: number;

  @Field()
  readonly newPassword?: string;
}
