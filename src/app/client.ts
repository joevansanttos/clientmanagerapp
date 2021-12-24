/**
 * @namespace clientmanagerapp
 */

import { Phone } from "./phone";

/**
 * Classe do Cliente
 */
export interface Client {

  id:number;
  firstName: string;
  lastName: string;
  address:string;
  district: string;
  phones:Phone[];


}

/**
 * Exporta os telefones do cliente
 */
export type phones = Array<Phone>;
