import { Person } from '../models/PersonType';
import { PricingPlan, PricingType } from '../models/PricingPlan';
import PetHostel from '../routes/pet/hostel';
import PricingInterface from './PricingInterface';

export default class FeatureRetriever implements PricingInterface {
  user: Person;
  pricings: Promise<Response> = fetch("/api/pricing");
  pricingType: PricingType;
  pricing: any;

  constructor(user: Person) {
    this.user = user;
    this.pricingType = user.pricingType;
    this.pricing = this.pricings
      .then(response => response.json())
      .then((data: PricingPlan[]) => data.find((p: PricingPlan) => p.type === this.pricingType));
  }

  async getPricing() {
    return await this.pricing;
  }

  async resolve() {
    return {
      "add-pet": this.user.pets < (await this.pricing)!.nPets || (await this.pricing)!.nPets < 0,
      "add-vet": this.user.vets < (await this.pricing)!.nVets || (await this.pricing)!.nVets < 0,
      "add-date": this.user.dates < (await this.pricing)!.nDates || (await this.pricing)!.nDates < 0,
      "veterinarySpecialities": (await this.pricing)!.veterinarySpecialities,
      "advProfile": (await this.pricing)!.advProfile,
      "vetHistory": (await this.pricing)!.vetHistory,
      "adoptionSys": (await this.pricing)!.adoptionSys,
      "petHostel": (await this.pricing)!.petHostel,
      "cost": (await this.pricing)!.cost
    };
  }

  async routes() {
    return [
      (await this.pricing).petHostel && {
        path: "/pet/hostel",
        component: PetHostel
      },
    ];
  }
}
