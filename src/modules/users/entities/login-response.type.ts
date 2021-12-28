import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: undefined })
export class LoginResponse {
  @Field()
  accessToken: String;

  @Field()
  refreshToken: String;
}
