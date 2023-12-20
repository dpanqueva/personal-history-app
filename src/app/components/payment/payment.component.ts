import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../core/service/client.service';
import { Client } from 'src/app/core/model/client';
import { v4 as uuid } from 'uuid';
import { PaymentService } from 'src/app/core/service/payment.service';
import { PaymentReference } from 'src/app/core/model/payment-reference';
import { InitSearch } from 'src/app/core/model/init-search';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(
    private router: Router,
    private clientService: ClientService,
    private paymentService: PaymentService) {}

  @Output()
  public onNewClient: EventEmitter<PaymentReference> = new EventEmitter();

  public client: Client = {
    id: '',
    name: '',
    email: '',
    phone: 0
  };

  public initSearch: InitSearch = {
    id: "abcdefghijklmonpqrstvwxyz"
  }

  public paymentReference: PaymentReference = {
    paymentName: '',
    paymentLastName: '',
    paymentEmail: '',
    paymentDocumentType: '',
    paymentDocumentNumber: '',
    paymentContact: '',
    paymentSignature: 'abcd',
    paymentStatus: "APPROVED",
    initSearch: this.initSearch
  };

  onClickPayment(): void {
    console.log("Create payment");
    console.log(this.paymentReference);
    const promise = this.paymentService.payUBuy(this.paymentReference);
    //const {response} = await this.paymentService.createPreference();
    promise.then((product)=>{
      console.log("This is product: "+product);

      let paymentString = `
          <html>
            <body>
              <form action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" method="post" id="payu_form">
              <input name="merchantId"      type="hidden"  value="${product.merchantId}">
              <input name="accountId"       type="hidden"  value="${product.accountId}">
              <input name="description"     type="hidden"  value="${product.description}">
              <input name="referenceCode"   type="hidden"  value="${product.referenceCode}">
              <input name="amount"          type="hidden"  value="${product.amount}">
              <input name="tax"             type="hidden"  value="${product.tax}">
              <input name="taxReturnBase"   type="hidden"  value="${product.taxReturnBase}">
              <input name="currency"        type="hidden"  value="${product.currency}">
              <input name="signature"       type="hidden"  value="${product.signature}">
              <input name="test"            type="hidden"  value="${product.test}">
              <input name="buyerEmail"      type="hidden"  value="${product.buyerEmail}">
              <input name="responseUrl"     type="hidden"  value="${product.responseUrl}">
              <input name="confirmationUrl" type="hidden"  value="${product.confirmationUrl}">
                <button type="submit" value="submit" #submitBtn></button>
              </form>
              <script type="text/javascript">document.getElementById("payu_form").submit();</script>
            </body>
          </html>`;
      console.log(paymentString);
      //console.log("Create client")
      //this.paymentReference.paymentSignature=product.signature;
      //this.clientService.addClient(this.paymentReference);
      //console.log("This is product: "+product.info.arg);
      //const a=2/0;
      const winUrl = URL.createObjectURL(
          new Blob([paymentString], { type: "text/html" })
      );

      window.location.href = winUrl;

    });
  }
    //this.router.navigate(['after-payment',123456,32131231]);
}

