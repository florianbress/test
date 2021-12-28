import { Injectable } from "@nestjs/common";
import { CreateSeasonRegistrationInput } from "./dto/create-season-registration.input";
import { UpdateSeasonRegistrationInput } from "./dto/update-season-registration.input";

@Injectable()
export class SeasonRegistrationsService {
  create(createSeasonRegistrationInput: CreateSeasonRegistrationInput) {
    return "This action adds a new seasonRegistration";
  }

  findAll() {
    return `This action returns all seasonRegistrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seasonRegistration`;
  }

  update(
    id: number,
    updateSeasonRegistrationInput: UpdateSeasonRegistrationInput
  ) {
    return `This action updates a #${id} seasonRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} seasonRegistration`;
  }
}
