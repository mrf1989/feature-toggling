import { atom } from "recoil";

export const pricingState = atom({
  key: "pricingState",
  default: {} as any
});

export const userState = atom({
  key: "userState",
  default: {} as any
});

export const routesState = atom({
  key: "routesState",
  default: [] as any
});

export const pricingPlanState = atom({
  key: "pricingPlanStatus",
  default: {} as any
});
