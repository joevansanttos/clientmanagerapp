/**
 * @namespace clientmanagerapp
 */

import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { PhoneService } from './phone.service';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor(private phoneService:PhoneService) { }


  /**
   *
   * @returns
   */
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


  /**
   *
   * @param firstName
   * @param lastName
   * @returns
   */
  MatchNames(firstName: string, lastName: string) {
    return (formGroup: FormGroup) => {

      const firstNameControl = formGroup.controls[firstName];
      const lastNameControl = formGroup.controls[lastName];

      if (!firstNameControl || !lastNameControl) {
        return null;
      }

      if (lastNameControl.errors && !lastNameControl.errors['matchNames']) {
        return null;
      }

      if (firstNameControl.value == lastNameControl.value || (firstNameControl.value + lastNameControl.value) < 10) {
        lastNameControl.setErrors({ matchNames: true });
      } else {
        lastNameControl.setErrors(null);
      }

      if ((firstNameControl.value?.length + lastNameControl.value?.length) < 10) {
        lastNameControl.setErrors({ matchNames: true });
      } else {
        lastNameControl.setErrors(null);
      }

    }
  }

}
