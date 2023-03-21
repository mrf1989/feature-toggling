import { PricingType } from "./PricingPlan";

export type Person = {
  username: string,
  password: string,
  pricingType: PricingType
  pets: number,
  vets: number,
  dates: number,
  role: Role
};

export enum Role {
  ADMIN = "ADMIN",
  VET = "VET",
  CUSTOMER = "CUSTOMER"
}