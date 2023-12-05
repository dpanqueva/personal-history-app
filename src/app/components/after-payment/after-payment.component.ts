import { Component, OnInit } from '@angular/core';
import { SearchPeopleJudicial } from 'src/app/core/model/search-people-judicial';
import { SearchPeopleService } from 'src/app/core/service/search-people.service';

@Component({
  selector: 'app-after-payment',
  templateUrl: './after-payment.component.html',
  styleUrls: ['./after-payment.component.css']
})
export class AfterPaymentComponent implements OnInit{
  searchPeople: SearchPeopleJudicial = new SearchPeopleJudicial();
  status: Boolean = true;

  constructor(private searchPeopleService: SearchPeopleService){}
  
  ngOnInit(): void {
    this.searchPeopleService.searchPeople(this.searchPeople).subscribe({
      next: (e) => {
        //this.messageService.successFullMessage('');
        this.status = false
      },
      error: (e) =>{
        //this.router.navigate(['']);
        this.status = false;
      }
    });
  }



}
