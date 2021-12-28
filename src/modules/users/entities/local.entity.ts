import { UserRole } from "./../enums/user-role.enum";
import { Extensions, Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";

@ObjectType()
export class Local {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  @Extensions({ role: UserRole.Admin })
  password!: string;

  @Field(() => String, { nullable: true })
  userId!: string | null;

  @Field(() => User, { nullable: true })
  User?: User | null;
}
