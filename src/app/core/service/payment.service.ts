import { Injectable } from '@angular/core';
import { Payment } from '../model/payment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  async payUBuy():Promise<any> {
    const resp= await fetch('http://localhost:8080/v1/payment/create-payu-payment?email=john1992alex@gmail.com', {
         method: 'POST',
         headers: {
             "Content-type": "application/json",
             "Access-Control-Allow-Origin": "*"
         }});
     const data = await resp.json();
     console.log(data);
     return data;
  }

  async validatePayment(payment: Payment): Promise<any> {
    const resp= await fetch('http://localhost:8080/v1/payment/validate-signature', {
         method: 'POST',
         body: JSON.stringify(payment),
         headers: {
             "Content-type": "application/json",
             "Access-Control-Allow-Origin": "*"
         }});
     const data = await resp.json();
     console.log(data);
     return data;
  }

}

