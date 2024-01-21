
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/common/env/environment.prod';
import { PaymentReference } from 'src/app/core/model/payment-reference';
import { SearchPeopleJudicial } from 'src/app/core/model/search-people-judicial';
import { PaymentService } from 'src/app/core/service/payment.service';
import { SearchPeopleService } from 'src/app/core/service/search-people.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  reference: string = "";
  paymentReference: PaymentReference = new PaymentReference();
  siteKey: string = environment.recaptcha_key;
  captcha: string = "";

  constructor(
    private activateRoute: ActivatedRoute
    , private router: Router
    , private searchPeopleService: SearchPeopleService
    , private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const referenceLocator = params['referenceLocator']
      if (referenceLocator) {
        this.reference = referenceLocator;
        this.searchPeopleService.searchPeopleConfirm(referenceLocator).subscribe({
          next: (e) => {
            this.reference = referenceLocator;
          },
          error: (e) => {
            this.router.navigate(['']);
          }
        });
      }
    });
  }

  @Output()
  public onNewClient: EventEmitter<PaymentReference> = new EventEmitter();

  emitClient(): void {
    this.paymentService.addClient(this.paymentReference);
  }

  resolved(response: any) {
    this.captcha = response;
    if (this.captcha) {
      this.onClickPayment();
    }
  }

  onClickPayment(): void {
    let searchInit = new SearchPeopleJudicial();
    searchInit.id = this.reference;
    this.paymentReference.initSearch = searchInit;
    const promise = this.paymentService.payUBuy(this.paymentReference);
    promise.then((product) => {

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
      this.paymentReference.paymentSignature = product.referenceCode;
      this.paymentService.addClient(this.paymentReference);
      const winUrl = URL.createObjectURL(new Blob([paymentString],
        { type: "text/html" }));
      window.open(winUrl, '_blank');

      window.location.href = winUrl;

    });
  }
}

