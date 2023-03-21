import { Person } from '../models/PersonType';
import { PricingPlan, PricingType } from '../models/PricingPlan';
import PricingInterface from './PricingInterface';

export default class FeatureRetriever implements PricingInterface {
  user: Person;
  pricings: Promise<Response> = fetch("/api/pricing");

  constructor(user: Person) {
    this.user = user;
  }

  async resolve() {
    const pricingType: PricingType = this.user.pricingType;
    const pricing = this.pricings
      .then(response => response.json())
      .then((data: PricingPlan[]) => data.find((p: PricingPlan) => p.type === pricingType));
      
    return {
      "advanced-profile": (await pricing)!.advProfile,
      "add-pet": this.user.pets < (await pricing)!.nPets || (await pricing)!.nPets < 0,
      "add-vet": this.user.vets < (await pricing)!.nVets || (await pricing)!.nVets < 0,
      "add-date": this.user.dates < (await pricing)!.nDates || (await pricing)!.nDates < 0,
      "veterinarySpecialities": ["cats", "dogs"],
      "advProfile": (await pricing)!.advProfile,
      "vetHistory": (await pricing)!.vetHistory,
      "adoptionSys": (await pricing)!.adoptionSys,
      "petHostel": (await pricing)!.petHostel,
      "cost": (await pricing)!.cost
    };
  }
}
