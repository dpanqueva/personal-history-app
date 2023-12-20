import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';
import { PaymentReference } from '../model/payment-reference';

@Injectable({providedIn: 'root'})
export class ClientService{

  constructor(private http: HttpClient) { }

  addClient(payment: PaymentReference):void{
    const apiUrl = 'http://localhost:8080/v1/payment/create-client';
    this.http.post(apiUrl, payment).subscribe((data)=>{
      console.log('Data received: ',data);
      console.log('Client saved sucessfull');
    });
  }

}
