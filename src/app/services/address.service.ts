import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private savedAddresses: string[] = []; 

  constructor() { }

  saveAddress(address: string) {
    this.savedAddresses.push(address); // Agrega la dirección al array
  }

  getAddresses() {
    return this.savedAddresses; // Devuelve las direcciones guardadas
  }


  
}
