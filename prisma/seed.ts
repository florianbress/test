import { UserRole } from "../src/modules/users/enums/user-role.enum";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/functions";
import { v5 as uuidv5 } from "uuid";

const prisma = new PrismaClient();

export default async function main() {
  console.log("🌱  Database seeder is running");

  const uuidNamespace = process.env.UUID_NAMESPACE;

  if (!uuidNamespace)
    throw new Error("Please set a UUID_NAMESPACE in the .env file");
  /**
   * Order is important, since there is connected a relation which requires previous entries made, to create relation/connect
   * Order as follows: Users -> Seasons -> Division -> DivisionGroups -> Organizations -> Teams -> Rosters -> Matches -> Articles -> UserLogEntries -> OrganizationLogEntries -> TeamLogEntries -> RosterLogEntries -> RosterLogEntries -> MatchLogEntries  (hiearchy)
   */

  await addUsers(uuidNamespace);
}

main()
  .catch((e) => {
    console.error("❌  Server error", e);
    process.exit();
  })
  .finally(async () => {
    console.log("💤  Server off");
    await prisma.$disconnect();
  });

async function addUsers(uuidNamespace: string) {
  const pass = process.env.TEST_USER_PASSWORD;

  if (!pass) throw new Error("Please set a TestUser Password in the .env file");

  const hashedPassword = await hashPassword(pass);

  const a = await prisma.user.upsert({
    where: { uuid: "4564974d-b5e8-5664-9ad9-cd3b0d5b6f80" },
    update: {
      username: "test",
      firstName: "test",
      lastName: "test",
      local: {
        connect: {
          email: "test@test.com",
        },
      },
    },
    create: {
      uuid: uuidv5("test", uuidNamespace),
      local: {
        create: {
          email: "test@test.com",
          password: hashedPassword,
        },
      },
      username: "test",
      firstName: "test",
      lastName: "test",
      role: UserRole.Admin,
    },
  });

  const b = await prisma.user.upsert({
    where: { uuid: "6a50b472-1a92-5735-9f19-21f312e3fd24" },
    update: {
      username: "bzelley1",
      firstName: "Bernhard",
      lastName: "Zelley",
      local: {
        connect: {
          email: "bzelley1@over-blog.com",
        },
      },
    },
    create: {
      uuid: uuidv5("bzelley1", uuidNamespace),
      local: {
        create: {
          email: "bzelley1@over-blog.com",
          password: hashedPassword,
        },
      },
      username: "bzelley1",
      firstName: "Bernhard",
      lastName: "Zelley",
      role: UserRole.User,
    },
  });

  const c = await prisma.user.upsert({
    where: { uuid: "5b128704-a394-58ed-9708-f4d24ebb4352" },
    update: {
      username: "tguyet2",
      firstName: "Tana",
      lastName: "Guyet",
      role: UserRole.User,
      local: {
        connect: {
          email: "tguyet2@t-online.de",
        },
      },
    },
    create: {
      uuid: uuidv5("tguyet2", uuidNamespace),
      local: {
        create: {
          email: "tguyet2@t-online.de",
          password: hashedPassword,
        },
      },
      username: "tguyet2",
      firstName: "Tana",
      lastName: "Guyet",
      role: UserRole.User,
    },
  });

  const d = await prisma.user.upsert({
    where: { uuid: "e1e1ecd4-afc7-506c-b1aa-5e57986b17d9" },
    update: {
      username: "asouley3",
      firstName: "Adrianne",
      lastName: "Souley",
      role: UserRole.User,
      local: {
        connect: {
          email: "asouley3@youku.com",
        },
      },
    },
    create: {
      uuid: uuidv5("asouley3", uuidNamespace),
      local: {
        create: {
          email: "asouley3@youku.com",
          password: hashedPassword,
        },
      },
      username: "asouley3",
      firstName: "Adrianne",
      lastName: "Souley",
      role: UserRole.User,
    },
  });

  const e = await prisma.user.upsert({
    where: { uuid: "803d5ff8-c73f-5242-abb6-88037741242b" },
    update: {
      username: "llorentz4",
      firstName: "Lira",
      lastName: "Lorentz",
      role: UserRole.User,
      local: {
        connect: {
          email: "llorentz4@vimeo.com",
        },
      },
    },
    create: {
      uuid: uuidv5("llorentz4", uuidNamespace),
      local: {
        create: {
          email: "llorentz4@vimeo.com",
          password: hashedPassword,
        },
      },
      username: "llorentz4",
      firstName: "Lira",
      lastName: "Lorentz",
      role: UserRole.User,
    },
  });

  console.log("Added users: ", { a, b, c, d, e });
}
