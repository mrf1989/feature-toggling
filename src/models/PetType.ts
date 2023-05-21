export type Pet = {
  id: number,
  name: string,
  birth: string,
  category: any,
  race: string,
  owner: number,
  photo: string,
  history: {
    id: number,
    date: string,
    comments: string
  },
  inHostal: boolean,
  inAdoption: boolean
};