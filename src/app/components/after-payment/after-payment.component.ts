import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsolidatedResponse } from 'src/app/core/model/consolidated-response';
import { Payment } from 'src/app/core/model/payment';
import { SearchPeopleJudicial } from 'src/app/core/model/search-people-judicial';
import { PaymentService } from 'src/app/core/service/payment.service';
import { SearchPeopleService } from 'src/app/core/service/search-people.service';

@Component({
  selector: 'app-after-payment',
  templateUrl: './after-payment.component.html',
  styleUrls: ['./after-payment.component.css']
})
export class AfterPaymentComponent implements OnInit {
  searchPeople: SearchPeopleJudicial = new SearchPeopleJudicial();
  status: Boolean = true;
  estadoTx: string = 'DECLINED';
  consolidatedResponse: ConsolidatedResponse = new ConsolidatedResponse();
  location: string = '4.598067,-74.076022';

  constructor(
    private searchPeopleService: SearchPeopleService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const referenceLocator = params['referenceLocator']
      if (referenceLocator) {
        this.searchPeopleService.searchPayConfirmStatus(referenceLocator).subscribe({
          next: (e) => {
            this.validatePayuSignature();
            //this.buildLocation();

          },
          error: (e) => {
            this.router.navigate(['']);
          }
        });
      }
    });


  }

  validatePayuSignature(): void {
    const payment: Payment = {
      merchantId: this.route.snapshot.queryParams['merchantId'],
      merchant_name: this.route.snapshot.queryParams['merchant_name'],
      merchant_address: this.route.snapshot.queryParams['merchant_address'],
      telephone: this.route.snapshot.queryParams['telephone'],
      merchant_url: this.route.snapshot.queryParams['merchant_url'],
      transactionState: this.route.snapshot.queryParams['transactionState'],
      lapTransactionState: this.route.snapshot.queryParams['lapTransactionState'],
      message: this.route.snapshot.queryParams['message'],
      referenceCode: this.route.snapshot.queryParams['referenceCode'],
      reference_pol: this.route.snapshot.queryParams['reference_pol'],
      transactionId: this.route.snapshot.queryParams['transactionId'],
      description: this.route.snapshot.queryParams['description'],
      cus: this.route.snapshot.queryParams['cus'],
      orderLanguage: this.route.snapshot.queryParams['orderLanguage'],
      extra1: this.route.snapshot.queryParams['extra1'],
      extra2: this.route.snapshot.queryParams['extra2'],
      extra3: this.route.snapshot.queryParams['extra3'],
      polTransactionState: this.route.snapshot.queryParams['polTransactionState'],
      signature: this.route.snapshot.queryParams['signature'],
      polResponseCode: this.route.snapshot.queryParams['polResponseCode'],
      lapResponseCode: this.route.snapshot.queryParams['lapResponseCode'],
      risk: this.route.snapshot.queryParams['risk'],
      polPaymentMethod: this.route.snapshot.queryParams['polPaymentMethod'],
      lapPaymentMethod: this.route.snapshot.queryParams['lapPaymentMethod'],
      polPaymentMethodType: this.route.snapshot.queryParams['polPaymentMethodType'],
      lapPaymentMethodType: this.route.snapshot.queryParams['lapPaymentMethodType'],
      installmentsNumber: this.route.snapshot.queryParams['installmentsNumber'],
      TX_VALUE: this.route.snapshot.queryParams['TX_VALUE'],
      TX_TAX: this.route.snapshot.queryParams['TX_TAX'],
      currency: this.route.snapshot.queryParams['currency'],
      lng: this.route.snapshot.queryParams['lng'],
      pseCycle: this.route.snapshot.queryParams['pseCycle'],
      buyerEmail: this.route.snapshot.queryParams['buyerEmail'],
      pseBank: this.route.snapshot.queryParams['pseBank'],
      pseReference1: this.route.snapshot.queryParams['pseReference1'],
      pseReference2: this.route.snapshot.queryParams['pseReference2'],
      pseReference3: this.route.snapshot.queryParams['pseReference3'],
      authorizationCode: this.route.snapshot.queryParams['authorizationCode'],
      TX_ADMINISTRATIVE_FEE: this.route.snapshot.queryParams['TX_ADMINISTRATIVE_FEE'],
      TX_TAX_ADMINISTRATIVE_FEE: this.route.snapshot.queryParams['TX_TAX_ADMINISTRATIVE_FEE'],
      TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE: this.route.snapshot.queryParams['TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE'],
      processingDate: this.route.snapshot.queryParams['processingDate']
    };

    const promise = this.paymentService.validatePayment(payment);
    promise.then((response) => {
      if (response.transStatus === undefined) {
        this.estadoTx = 'DECLINED';
      } else {
        debugger
        console.log(response);
        let statusTx: string = response.transStatus as string;
        this.estadoTx = statusTx;
        this.consolidatedResponse = response;
        this.buildLocation(this.consolidatedResponse);
        console.log(this.consolidatedResponse);
      }
    })
  }

  buildLocation(rs: ConsolidatedResponse) {
    debugger
    let locationG = rs.geometry?.location;
    if (locationG) {
      if (locationG.lat && locationG.lng) {
        this.location=locationG.lat + "," + locationG.lng;
        return this.location;
      }
    }
    return this.location;
  }


}
