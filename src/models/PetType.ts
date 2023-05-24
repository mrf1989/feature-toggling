export type Pet = {
  id: number,
  name: string,
  birth: string,
  category: any,
  race: string,
  owner: number,
  photo: string,
  history: [PetHistory],
  inHostal: boolean,
  inAdoption: boolean
};

export type PetHistory = {
  id: number,
  date: string,
  comments: string
};