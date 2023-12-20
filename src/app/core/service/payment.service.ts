import { Injectable } from '@angular/core';
import { Payment } from '../model/payment';
import { PaymentReference } from '../model/payment-reference';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  async payUBuy(paymentReference: PaymentReference):Promise<any> {
    const resp= await fetch('http://localhost:8080/api/v1/invexdijin/create-payu-payment', {
         method: 'POST',
         body: JSON.stringify(paymentReference),
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

