/**
 * @namespace clientmanagerapp
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  /**
   * Url definida para
   */
  private apiServerUrl =  environment.apiBaseUrl;

  /**
   *
   * @param http
   */
  constructor(private http:HttpClient) { }

  /**
   * Metodo para entregar todos os clientes cadastrados
   * @returns Retorna todos os clientes cadastrados
   */
  public getClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/all`);
  }

  /**
   * Metodo para adicionar cliente
   * @param client Cliente para ser adicionado
   * @returns Retorna cliente adicionado
   */
  public addClient(client:Client):Observable<Client>{
    return this.http.post<Client>(`${this.apiServerUrl}/client/add`, client);
  }

  /**
   * Metodo que exclui cliente
   * @param clientId
   * @returns
   */
  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/client/delete/${clientId}`);
  }

  /**
   *
   * @param client
   * @returns
   */
  public updateClient(client:Client):Observable<Client>{
    console.log(client);
    return this.http.put<Client>(`${this.apiServerUrl}/client/update`, client);
  }

  /**
   *
   * @param id
   * @returns
   */
  public findClientById(id:number):Observable<Client>{
    return this.http.get<Client>(`${this.apiServerUrl}/client/find/${id}`);
  }
}
