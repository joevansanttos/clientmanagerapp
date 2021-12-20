import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './services/client.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Phone } from './phone';
import { CustomvalidationService } from './services/customvalidation.service';
import { PhoneService } from './services/phone.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public client!:Client;

  public clients!: Client[];

  public editClient!:Client;

  public deleteClient!:Client;

  public addPhoneClient!:Client;

  public phone!:Phone;

  public editPhone!:Phone;

  public deletePhone!:Phone;

  public clientForm!: FormGroup;


  public phoneForm!: FormGroup;



  constructor(private clientService:ClientService, private phoneService:PhoneService, private customValidator:CustomvalidationService, private fb: FormBuilder) { }

  ngOnInit(){
    this.getClients();

    this.phoneForm = new FormGroup({
      'numbers': new FormControl(null, Validators.required, this.customValidator.phoneAlreadyExists() )
    });

    this.clientForm = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'district': new FormControl('', Validators.required)
    }, {validator: this.customValidator.MatchNames('firstName', 'lastName')}

    );
  }

  public getClients():void{
    this.clientService.getClients().subscribe(
      (response:Client[]) => {
        this.clients = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddClient(addForm:FormGroup) : void{
    document.getElementById('add-client-form')?.click();
    this.clientService.addClient(addForm.value).subscribe(
      (response:Client) => {
        console.log(response);
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onAddPhone(addPhoneForm:FormGroup, clientId:number) : void{
    document.getElementById('add-phone-form')?.click();
    this.phoneService.addPhone(addPhoneForm.value, clientId).subscribe(
      (response:Phone) => {
        console.log(response);
        this.getClients();
        addPhoneForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addPhoneForm.reset();
      }
    );
  }

  public onDeleteClient(clientId:number) : void{
    this.clientService.deleteClient(clientId).subscribe(
      (response:void) => {
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePhone(phoneId:number) : void{
    this.phoneService.deletePhone(phoneId).subscribe(
      (response:void) => {
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(client:Client | null, mode:string) :void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addClientModal');
    }
    if (mode === 'edit') {
      if(client != null){
        this.editClient = client;
      }
      button.setAttribute('data-target', '#updateClientModal');
    }
    if (mode === 'delete') {
      if(client != null){
        this.deleteClient = client;
      }

      button.setAttribute('data-target', '#deleteClientModal');
    }

    if (mode === 'phone') {
      if(client != null){
        this.addPhoneClient = client;
      }

      button.setAttribute('data-target', '#addPhoneModal');
    }

    container!.appendChild(button);
    button.click();
  }

  public onOpenModalPhone(phone:Phone | null, mode:string) :void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    if (mode === 'edit') {
      if(phone != null){
        this.editPhone = phone;
      }
      button.setAttribute('data-target', '#updatePhoneModal');
    }
    if (mode === 'delete') {
      if(phone != null){
        console.log(phone);
        this.deletePhone = phone;
      }

      button.setAttribute('data-target', '#deletePhoneModal');
    }


    container!.appendChild(button);
    button.click();
  }
}


