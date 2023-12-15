import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchPeopleJudicial } from 'src/app/core/model/search-people-judicial';
import { MessageService } from 'src/app/core/service/message.service';
import { SearchPeopleService } from 'src/app/core/service/search-people.service';

@Component({
  selector: 'app-finding-person',
  templateUrl: './finding-person.component.html',
  styleUrls: ['./finding-person.component.css']
})
export class FindingPersonComponent implements OnInit {

  searchPeople: SearchPeopleJudicial = new SearchPeopleJudicial();
  status: Boolean = true;
  reference: string = "";

  constructor(
    private searchPeopleService: SearchPeopleService,
    private messageService: MessageService
    , private activateRoute: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const referenceLocator = params['referenceLocator']
      if (referenceLocator) {
         this.searchPeopleService.searchPeopleConfirm(referenceLocator).subscribe({
          next: (e) => {
            this.status = false
            this.reference = referenceLocator;
          },
          error: (e) => {
            console.log('error')
            this.router.navigate(['']);
          }
        });
      }
    });
  }

  onClickUnlockProfile(): void {
    this.router.navigate(['payment']);
  }

}
