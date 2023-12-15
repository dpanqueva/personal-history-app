import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchPeopleService } from 'src/app/core/service/search-people.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  reference: string = "";

  constructor(
     private activateRoute: ActivatedRoute
    , private router: Router
    , private searchPeopleService: SearchPeopleService) { }

    ngOnInit(): void {
      this.activateRoute.params.subscribe(params => {
        const referenceLocator = params['referenceLocator']
        if (referenceLocator) {
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


  onClickPayment(): void {
    this.router.navigate(['after-payment',123456,32131231]);
  }
}
