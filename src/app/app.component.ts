/**
 * @namespace clientmanagerapp
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './services/client.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Phone } from './phone';
import { CustomvalidationService } from './services/customvalidation.service';
import { PhoneService } from './services/phone.service';
import { first } from 'rxjs';


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

  public updatePhoneClient!:Client;

  public phone!:Phone;

  public editPhone!:Phone;

  public deletePhone!:Phone;

  public clientForm!: FormGroup;

  public phoneForm!: FormGroup;

  public editPhoneForm!: FormGroup;

  public updateClientForm!: FormGroup;


  /**
   *
   * @param clientService Service de Clientes
   * @param phoneService Service de Telefones
   * @param customValidator Service para validação customozaveis
   * @param fb Formulario usado para criar formulários reativos
   */
  constructor(private clientService:ClientService, private phoneService:PhoneService, private customValidator:CustomvalidationService, private fb: FormBuilder) { }

  ngOnInit(){
    this.getClients();

    /**
     * Formulario de adicionar telefone recebe validações em seus respectivos campos
     */
    this.phoneForm = new FormGroup({
      'numbers': new FormControl('', Validators.required, this.customValidator.phoneAlreadyExists() )
    });

    /**
     * Formulario para atualizar telefone recebe validações em seus respectivos campos
     */
    this.editPhoneForm = new FormGroup({
      'numbers': new FormControl('', Validators.required, this.customValidator.phoneAlreadyExists() )
    });

    /**
     * Formulario de adicionar cliente recebe validações em seus respectivos campos
     */
    this.clientForm = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'district': new FormControl('', Validators.required)
    }, {validator: this.customValidator.MatchNames('firstName', 'lastName')}
    );

    /**
     * Formulario para atualizar client recebe validações em seus respectivos campos
     */
    this.updateClientForm = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'district': new FormControl('', Validators.required),
      'id' : new FormControl(''),
    }, {validator: this.customValidator.MatchNames('firstName', 'lastName')}
    );
  }

  /**
   * Metodo que lista todos os clientes
   */
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

  /**
   * Metodo que adiciona cliente
   * @param addForm Formulario que adiciona cliente passado como parametro do app.component.html
   */
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

  /**
   * Metodo que adiciona telefone a cliente
   * @param addPhoneForm Formulario que adiciona telefone passado como parametro do app.component.html
   * @param clientId Id de Cliente que o telefone sera adicionado passado como parametro
   */
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

  /**
   * Metodo que atualiza telefone
   * @param editPhoneForm Formulario que atualiza telefone passado como parametro do app.component.html
   * @param phone Telefone que devera ser atualizado
   */
  public onUpdatePhone(editPhoneForm:FormGroup, phone:Phone) : void{
    this.phoneService.updatePhone(editPhoneForm.value, phone).subscribe(
      (response:Phone) => {
        console.log(response);
        this.getClients();
        editPhoneForm.reset();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        editPhoneForm.reset();
      }
    );
  }


  /**
   * Metodo que atualiza cliente
   * @param updateClientForm Formulario que atualiza cliente passado como parametro do app.component.html
   */
  public onUpdateClient(updateClientForm:FormGroup) : void{
    this.clientService.updateClient(updateClientForm.value).subscribe(
      (response:Client) => {
        console.log(response);
        this.getClients();
        updateClientForm.reset();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        updateClientForm.reset();
      }
    );
  }


  /**
   * Metodo que exlcui cliente
   * @param clientId Id de cliente que deverá ser excluido
   */
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


  /**
   * Metodo que exlcui telefone
   * @param phoneId Id de telefone que deverá ser excluido
   */
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


  /**
   * Metodo que define o que sera feito com o cliente
   * @param client Cliente que devera ser adiconado, atualizado ou excluido
   * @param mode modo que define se o usuario dejeja adicionar, atualizar clientes
   */
  public onOpenModal(client:Client | null, mode:string) :void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    /**
     * Caso o modo seja adicionar, o id do form de adicionar cliente e atribuido a botao que sera clicado
     */
    if (mode === 'add') {
      button.setAttribute('data-target', '#addClientModal');
    }

    /**
     * Caso o modo seja para atualizar, o id do form de atualizar cliente e atribuido a botao que sera clicado
     */
    if (mode === 'edit') {
      if(client != null){
        this.editClient = client;
      }

      /**
       * Adiciona ao formulario de atualizar cliente, informaçoes do cliente que se deseja atualizar
       */
      this.updateClientForm.setValue({
        firstName: this.editClient.firstName,
        lastName: this.editClient.lastName,
        address: this.editClient.address,
        district : this.editClient.district,
        id: this.editClient.id
     });
      button.setAttribute('data-target', '#updateClientModal');
    }


    /**
     *
     */
    if (mode === 'delete') {
      if(client != null){
        this.deleteClient = client;
      }

      button.setAttribute('data-target', '#deleteClientModal');
    }

    /**
     *
     */
    if (mode === 'phone') {
      if(client != null){
        this.addPhoneClient = client;
      }

      button.setAttribute('data-target', '#addPhoneModal');
    }

    container!.appendChild(button);
    button.click();
  }


  /**
   *
   * @param phone
   * @param mode
   */
  public onOpenModalPhone(phone:Phone | null,  mode:string) :void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    if (mode === 'edit') {
      if(phone != null){
        this.editPhone = phone;
      }

      this.editPhoneForm.setValue({
        numbers: this.editPhone.numbers
     });

      button.setAttribute('data-target', '#updatePhoneModal');
    }
    if (mode === 'delete') {
      if(phone != null){
        this.deletePhone = phone;
      }

      button.setAttribute('data-target', '#deletePhoneModal');
    }


    container!.appendChild(button);
    button.click();
  }
}


