import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phone } from '../phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private apiServerUrl =  environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public updatePhone(updatePhone:Phone, phone:Phone):Observable<Phone>{
    updatePhone.id = phone.id;
    return this.http.put<Phone>(`${this.apiServerUrl}/phone/update`, updatePhone);
  }

  public addPhone(phone:Phone, clientId:number):Observable<Phone>{
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var json = JSON.stringify({"numbers" : phone.numbers, "clientId": clientId});
    return this.http.post<Phone>(`${this.apiServerUrl}/phone/add`, json, {headers: headers} );
  }

  public deletePhone(phoneId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phone/delete/${phoneId}`);
  }

  verifyPhoneExists(phoneNumbers:string){
    return this.http.get(`${this.apiServerUrl}/phone/exists/${phoneNumbers}`);
  }
}
