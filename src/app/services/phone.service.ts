/**
 * @namespace clientmanagerapp
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phone } from '../phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  /**
   * url parametro que possui url para service
   */
  private apiServerUrl =  environment.apiBaseUrl;

  /**
   *
   * @param http Serviço para comunicação com o backend
   */
  constructor(private http:HttpClient) { }

  /**
   * Metodo que comunica com o backend para atualizaçao de telefone
   * @param updatePhone Parametro que contem os dados de telefone para sem atualizados
   * @param phone Teleefone que devera ser atualizado
   * @returns Retorna telefone atualizado
   */
  public updatePhone(updatePhone:Phone, phone:Phone):Observable<Phone>{
    updatePhone.id = phone.id;
    return this.http.put<Phone>(`${this.apiServerUrl}/phone/update`, updatePhone);
  }


  /**
   * Metodo que comunica com o backend para adicionar um telefone
   * @param phone Parametro que contem os dados de telefone para sem adicionados
   * @param clientId identificador de cliente que será adicionado o telefone
   * @returns
   */
  public addPhone(phone:Phone, clientId:number):Observable<Phone>{
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var json = JSON.stringify({"numbers" : phone.numbers, "clientId": clientId});
    return this.http.post<Phone>(`${this.apiServerUrl}/phone/add`, json, {headers: headers} );
  }


  /**
   * Metodo que comunica com o backend para excluir um telefone
   * @param phoneId identificador do telefone que deverá ser excluído
   */
  public deletePhone(phoneId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phone/delete/${phoneId}`);
  }

  /**
   * Metodo que comunica com o backend para verificar se telefone existe
   * @param phoneNumbers numeros do telefone que serão verificados
   * @returns Retorna verdadeiro caso numero já exista
   */
  verifyPhoneExists(phoneNumbers:string){
    return this.http.get(`${this.apiServerUrl}/phone/exists/${phoneNumbers}`);
  }
}
