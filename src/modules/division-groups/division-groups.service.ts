import { Injectable } from "@nestjs/common";
import { CreateDivisionGroupInput } from "./dto/create-division-group.input";
import { UpdateDivisionGroupInput } from "./dto/update-division-group.input";

@Injectable()
export class DivisionGroupsService {
  create(createDivisionGroupInput: CreateDivisionGroupInput) {
    return "This action adds a new divisionGroup";
  }

  findAll() {
    return `This action returns all divisionGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} divisionGroup`;
  }

  update(id: number, updateDivisionGroupInput: UpdateDivisionGroupInput) {
    return `This action updates a #${id} divisionGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} divisionGroup`;
  }
}
