import { Field, InputType } from "@nestjs/graphql";
import { EmailType } from "../enums/email-type.enum";

@InputType()
export class CreateEmailInput {
  @Field(() => String)
  userId: string;

  @Field(() => EmailType)
  type: EmailType;
}
