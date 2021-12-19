import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { PhoneService } from './phone.service';

@Injectable({
  providedIn: 'root'
})
export class ExistphoneService {

  constructor(private phoneService:PhoneService) { }

  phoneAlreadyExists(){
    return (control:AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((phoneNumber) =>
          this.phoneService.verifyPhoneExists(phoneNumber)
        ),
        map((phoneExist) =>
          phoneExist ? {phoneExist:true} : null
        ),
        first()
      );
    };
  }

}
