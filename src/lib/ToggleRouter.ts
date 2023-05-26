import { Person, unauthenticatedUser } from '../models/PersonType';
import { defaultFreePlan, PricingPlan, PricingType } from '../models/PricingPlan';
import AdoptionSys from '../routes/pet/adoption';
import PetForm from '../routes/pet/form';
import PetHostel from '../routes/pet/hostel';
import VetForm from '../routes/vet/form';
import VetHistory from '../routes/vet/history';
import ToggleRouterInterface from './ToggleRouterInterface';

export default class ToggleRouter implements ToggleRouterInterface {
  private static instance: ToggleRouter | null = null;
  private user: Person;
  private pricing: PricingPlan;
  private listeners: Function[] = [];

  constructor(user: Person, pricing: PricingPlan) {
    this.user = user;
    this.pricing = pricing;
  }

  public static getInstance(): ToggleRouter {
    if (!ToggleRouter.instance) {
      ToggleRouter.instance = new ToggleRouter(unauthenticatedUser, defaultFreePlan);
    }
    return ToggleRouter.instance;
  }

  public destroyInstance(): void {
    const instance = ToggleRouter.instance;
    if (!instance) {
      return;
    }

    instance.user = unauthenticatedUser;
    instance.pricing = defaultFreePlan;
    this.notifyListeners();
  }

  public async updateInstance(userId: number, pricingType: PricingType): Promise<void> {
    const instance = ToggleRouter.instance;
    if (!instance) {
      return;
    }

    const userResponse = await fetch(`/api/user/${userId}`);
    const pricingResponse = await fetch(`/api/pricing/${pricingType}`);

    if (!userResponse.ok || !pricingResponse.ok) {
      return;
    }

    const user = await userResponse.json() as Person;
    const pricing = await pricingResponse.json() as PricingPlan;

    instance.user = user;
    instance.pricing = pricing;

    this.notifyListeners();
  }

  getPricing(): PricingPlan {
    return this.pricing;
  }

  getUser(): Person {
    return this.user;
  }

  updateUser(payload: any) {
    this.user = {
      ...this.user,
      ...payload
    }

    this.notifyListeners();
  }

  subscribe(listener: Function) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Function) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  getFeatures() {
    const pricing = this.getPricing();
    return {
      "add-pet": this.user.pets < pricing.nPets || pricing.nPets < 0,
      "add-vet": this.user.vets < pricing.nVets || pricing.nVets < 0,
      "add-date": this.user.dates < pricing.nDates || pricing.nDates < 0,
      "veterinarySpecialities": pricing.veterinarySpecialities.find((s) => s === "all") ? true : false,
      "advProfile": pricing.advProfile,
      "vetHistory": pricing.vetHistory,
      "adoptionSys": pricing.adoptionSys,
      "petHostel": pricing.petHostel,
      "cost": pricing.cost
    };
  }

  getRoutes() {
    const features = this.getFeatures();
    return [
      features['add-pet'] && {
        path: "/pet/add",
        component: PetForm
      },
      features['add-vet'] && {
        path: "/vet/add",
        component: VetForm
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