import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

/**
 * Returns hashed password by hash password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @returns The hashed password mean of `password`
 *
 * @beta
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

/**
 * Returns boolean by compare password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @param hash - The second input number
 * @returns The boolean mean of `password` and `hash`
 *
 * @beta
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}
export async function increasePinAttempts(uuid: string, prisma: PrismaClient) {
  const increasePinValidationFail = await prisma.pinValidationFail.upsert({
    where: {
      userId: uuid,
    },
    update: {
      count: {
        increment: 1,
      },
    },
    create: {
      userId: uuid,
      count: 1,
    },
  });

  if (!increasePinValidationFail)
    throw new HttpException(
      "PIN_INCREASE_FAILED",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
}

export async function validateLockedAccount(
  uuid: string,
  prisma: PrismaClient
) {
  const lockedFail = await prisma.userLocked.findMany({
    where: {
      userId: uuid,
    },
  });

  let islocked = false;
  lockedFail.forEach((element) => {
    if (
      element.createdAt.getTime() / 1000 + element.duration >=
      new Date().getTime() / 1000
    ) {
      islocked = true;
    }
  });

  return islocked;
}

export async function checkPinAttempts(uuid: string, prisma: PrismaClient) {
  const updateCount = await prisma.pinValidationFail.findFirst({
    where: {
      userId: uuid,
    },
  });

  if (!updateCount) {
    throw new HttpException("COUNT_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
  } else {
    return updateCount.count < 5;
  }
}

export async function resetPinAttempts(uuid: string, prisma: PrismaClient) {
  const pinCount = await prisma.pinValidationFail.upsert({
    where: {
      userId: uuid,
    },
    update: {
      count: 0,
    },
    create: {
      count: 0,
      userId: uuid,
    },
  });

  if (!pinCount)
    throw new HttpException(
      "RESET_PIN_FAILED",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
}

/**
 * Tries to lock the user with given uuid.
 * True on lock, false on not locked
 */
export async function tryLockedAccount(uuid: string, prisma: PrismaClient) {
  const pinAttempts = await checkPinAttempts(uuid, prisma);

  if (pinAttempts === true) {
    return false;
  } else {
    let lockedCount = 0;

    const findAllCount = await prisma.userLocked.findMany({
      where: {
        userId: uuid,
        reason: "PIN_ATTEMPTS_EXCEEDED",
      },
    });

    findAllCount.forEach((e) => {
      if (
        e.createdAt.getTime() / 1000 >
        new Date().getTime() / 1000 - 60 * 30
      ) {
        lockedCount++;
      }
    });

    const updateCount = await prisma.userLocked.create({
      data: {
        userId: uuid,
        duration: (lockedCount + 1) * 15,
        reason: "PIN_ATTEMPTS_EXCEEDED",
      },
    });

    const pinCount = await prisma.pinValidationFail.upsert({
      where: {
        userId: uuid,
      },
      update: {
        count: 0,
      },
      create: {
        count: 0,
        userId: uuid,
      },
    });

    if (!pinCount)
      throw new HttpException(
        "PIN_NOT_FOUND",
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    if (!updateCount)
      throw new HttpException(
        "UPDATE_LOCK_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
  }

  return true;
}
