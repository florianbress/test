import { Injectable } from "@nestjs/common";
import { CreateRosterInput } from "./dto/create-roster.input";
import { UpdateRosterInput } from "./dto/update-roster.input";

@Injectable()
export class RostersService {
  create(createRosterInput: CreateRosterInput) {
    return "This action adds a new roster";
  }

  findAll() {
    return `This action returns all rosters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roster`;
  }

  update(id: number, updateRosterInput: UpdateRosterInput) {
    return `This action updates a #${id} roster`;
  }

  remove(id: number) {
    return `This action removes a #${id} roster`;
  }
}
