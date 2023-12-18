import { Injectable } from '@angular/core';
import { Payment } from '../model/payment';
import { environment } from 'src/app/common/env/environment.prod';
import { HttpClient } from '@angular/common/http';
import { PaymentReference } from '../model/payment-reference';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: string = environment.base_url;

  constructor(private http: HttpClient) { }

  async payUBuy(): Promise<any> {
    const resp = await fetch(this.url.concat('/create-payu-payment'), {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    const data = await resp.json();
    console.log(data);
    return data;
  }

  async validatePayment(payment: Payment): Promise<any> {
    const resp = await fetch(this.url.concat('/validate-signature'), {
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
    this.http.post(this.url.concat('create-payment'), payment).subscribe((data) => {
      console.log('Data received: ', data);
      console.log('Client saved sucessfull');
    });
  }

}

