import { PricingType } from "./PricingPlan";

export type User = {
  id: number,
  username: string,
  password: string,
  pricingType: PricingType
  pets: number,
  vets: number,
  dates: number,
  photo: string,
  role: Role
};

export enum Role {
  ADMIN = "ADMIN",
  VET = "VET",
  CUSTOMER = "CUSTOMER",
  NO_ROLE = "NO_ROLE"
}

export const unauthenticatedUser: User = {
  id: -1,
  username: "guest",
  password: "guest",
  role: Role.NO_ROLE,
  pets: 0,
  vets: 0,
  dates: 0,
  photo: "",
  pricingType: PricingType.NO_PRICING,
}