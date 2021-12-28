import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateEmailInput } from "./dto/create-email.input";
import { EmailsService } from "./emails.service";
import { Email } from "./entities/email.entity";

@Resolver(() => Email)
export class EmailsResolver {
  constructor(private readonly emailsService: EmailsService) {}

  @Mutation(() => Email)
  createEmail(@Args("createEmailInput") createEmailInput: CreateEmailInput) {
    return this.emailsService.create(createEmailInput);
  }

  @Mutation(() => Boolean)
  openEmail(@Args("id") id: number) {
    return this.emailsService.openEmail(id);
  }
}
