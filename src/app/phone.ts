/**
 * @namespace clientmanagerapp
*/

import { Client } from './client';

/**
 * Classe da entidade telefone
 */
export interface Phone {

  id:number;
  numbers: string;
  client:Client
}
