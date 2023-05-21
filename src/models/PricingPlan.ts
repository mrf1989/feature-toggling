export type PricingPlan = {
  type: PricingType,
  nVets: number,
  nPets: number,
  nDates: number,
  veterinarySpecialities: string[],
  advProfile: boolean,
  vetHistory: boolean,
  adoptionSys: boolean,
  petHostel: boolean,
  cost: number
}

export enum PricingType {
  BASIC = "BASIC",
  ADVANCED = "ADVANCED",
  PRO = "PRO",
  NO_PRICING = "NO_PRICING"
}

export const defaultFreePlan: PricingPlan = {
  type: PricingType.NO_PRICING,
  nVets: 0,
  nPets: 0,
  nDates: 0,
  veterinarySpecialities: [],
  advProfile: false,
  vetHistory: false,
  adoptionSys: false,
  petHostel: false,
  cost: 0
}
