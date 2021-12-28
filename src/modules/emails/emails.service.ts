import { Injectable } from "@nestjs/common";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import { ForbiddenError } from "apollo-server-core";
import { PrismaService } from "../../shared/prisma/prisma.service";

import { CreateEmailInput } from "./dto/create-email.input";

@Injectable()
export class EmailsService {
  constructor(
    private prisma: PrismaService,
    @OgmaLogger(EmailsService) private readonly logger: OgmaService
  ) {}
  async create(createEmailInput: CreateEmailInput) {
    return await this.prisma.email.create({
      data: {
        User: { connect: { uuid: createEmailInput.userId } },
        type: createEmailInput.type,
      },
    });
  }

  async openEmail(id: number) {
    const email = await this.prisma.email.findUnique({
      where: {
        id,
      },
    });

    if (!email) {
      throw new ForbiddenError("Email not found.");
    }

    const updateEmail = await this.prisma.email.update({
      where: {
        id,
      },
      data: {
        isOpened: true,
      },
    });

    email.isOpened = true;

    return updateEmail ? true : false;
  }
}
