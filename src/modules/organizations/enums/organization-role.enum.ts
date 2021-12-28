import { registerEnumType } from "@nestjs/graphql";

export enum OrganizationRole {
  Owner = "Owner",
  Manager = "Manager",
  Member = "Member",
}

registerEnumType(OrganizationRole, {
  name: "OrganizationRole",
  description: undefined,
});
