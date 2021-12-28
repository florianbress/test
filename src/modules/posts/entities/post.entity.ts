import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";

@ObjectType()
export class Post {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  body!: string;

  @Field(() => String, { nullable: false })
  image!: string;

  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;
}
