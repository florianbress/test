import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangePasswordInput {
  @Field()
  username: string;

  @Field()
  pinCode: number;

  @Field()
  readonly oldPassword?: string;

  @Field()
  readonly newPassword?: string;
}
