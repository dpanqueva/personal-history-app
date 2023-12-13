import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';

@Injectable({providedIn: 'root'})
export class ClientService{

  constructor(private http: HttpClient) { }

  addClient(client:Client):void{
    const apiUrl = 'http://localhost:8080/v1/payment/create-client';
    this.http.post(apiUrl, client).subscribe((data)=>{
      console.log('Data received: ',data);
      console.log('Client saved sucessfull');
    });
  }

}
