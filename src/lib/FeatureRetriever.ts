import { Person } from '../models/PersonType';
import { PricingPlan, PricingType } from '../models/PricingPlan';
import AdoptionSys from '../routes/pet/adoption';
import PetForm from '../routes/pet/form';
import PetHostel from '../routes/pet/hostel';
import VetHistory from '../routes/vet/history';
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
    const pricing = await this.getPricing();
    return {
      "add-pet": this.user.pets < pricing.nPets || pricing.nPets < 0,
      "add-vet": this.user.vets < pricing.nVets || pricing.nVets < 0,
      "add-date": this.user.dates < pricing.nDates || pricing.nDates < 0,
      "veterinarySpecialities": pricing.veterinarySpecialities,
      "advProfile": pricing.advProfile,
      "vetHistory": pricing.vetHistory,
      "adoptionSys": pricing.adoptionSys,
      "petHostel": pricing.petHostel,
      "cost": pricing.cost
    };
  }

  async routes() {
    const features = await this.resolve();
    return [
      features['add-pet'] && {
        path: "/pet/add",
        component: PetForm
      },
      features.petHostel && {
        path: "/pet/hostel",
        component: PetHostel
      },
      features.vetHistory && {
        path: "/vet/history/:id",
        component: VetHistory
      },
      features.adoptionSys && {
        path: "pet/adoption",
        component: AdoptionSys
      }
    ];
  }
}
