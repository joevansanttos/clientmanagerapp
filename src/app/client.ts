import { Phone } from "./phone";

export interface Client {

  id:number;
  name: string;
  address:string;
  district: string;
  phones:Phone[];


}

export type phones = Array<Phone>;
