import { Injectable } from '@angular/core';
import { Payment } from '../model/payment';
import { environment } from 'src/app/common/env/environment.prod';
import { HttpClient } from '@angular/common/http';
import { PaymentReference } from '../model/payment-reference';
import { ConsolidatedResponse } from '../model/consolidated-response';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: string = environment.base_url_payment;

  constructor(private http: HttpClient) { }

  async payUBuy(payment: PaymentReference): Promise<any> {
    const resp = await fetch(this.url.concat('create-payu-payment'), {
      method: 'POST',
      body: JSON.stringify(payment),
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    const data = await resp.json();
    console.log(data);
    return data;
  }

  async validatePayment(payment: Payment): Promise<ConsolidatedResponse> {
    const resp = await fetch(this.url.concat('validate-signature'), {
      method: 'POST',
      body: JSON.stringify(payment),
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    const data = await resp.json();
    console.log(data);
    return data;
  }

  addClient(payment: PaymentReference): void {
    this.http.post(this.url.concat('create-client'), payment).subscribe((data) => {
      console.log('Data received: ', data);
      console.log('Payment saved sucessfull');
    });
  }

}

