import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  role: string;

  @Field(() => String, {
    description: "The Epic ID of the User",
    nullable: true,
  })
  epicId?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String)
  email: string;

  @Field()
  updatedAt?: Date;

  @Field()
  createdAt?: Date;

  @Field(() => Boolean)
  isVerified?: boolean;

  @Field(() => Boolean)
  isActive?: boolean;

  @Field(() => Boolean)
  isLocked?: boolean;
}
