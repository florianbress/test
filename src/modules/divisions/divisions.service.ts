import { Injectable } from "@nestjs/common";
import { CreateDivisionInput } from "./dto/create-division.input";
import { UpdateDivisionInput } from "./dto/update-division.input";

@Injectable()
export class DivisionsService {
  create(createDivisionInput: CreateDivisionInput) {
    return "This action adds a new division";
  }

  findAll() {
    return `This action returns all divisions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} division`;
  }

  update(id: number, updateDivisionInput: UpdateDivisionInput) {
    return `This action updates a #${id} division`;
  }

  remove(id: number) {
    return `This action removes a #${id} division`;
  }
}
