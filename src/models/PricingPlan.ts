export type PricingPlan = {
  type: PricingType,
  nVets: number,
  nPets: number,
  nDates: number,
  advProfile: boolean,
  vetHistory: boolean,
  adoptionSys: boolean,
  petHostel: boolean,
  cost: number
}

export enum PricingType {
  BASIC = "BASIC",
  ADVANCED = "ADVANCED",
  PRO = "PRO"
}