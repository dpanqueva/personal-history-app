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

  constructor(
    private searchPeopleService: SearchPeopleService,
    private messageService: MessageService
    , private activateRoute: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let documentType = params['documentType'];
      let documentNumber = params['documentNumber'];
      let cellphone = params['cellphone']
      let searchType = params['searchType'];
      if (documentType && documentNumber && cellphone && cellphone) {
        this.searchPeople.documentType = documentType;
        this.searchPeople.documentNumber = documentNumber;
        this.searchPeople.cellphone = cellphone;
        this.searchPeople.searchType = searchType;
        this.searchPeopleService.searchPeople(this.searchPeople).subscribe({
          next: (e) => {
            this.messageService.successFullMessage('');
            this.status = false
          },
          error: (e) =>{
            //this.router.navigate(['']);
            this.status = false;
          }
        });
      } else {
        this.router.navigate(['']);
        this.messageService.warningMessage('Por favor genere una consulta.');
      }
    });
  }

  onClickUnlockProfile():void{
    this.router.navigate(['payment']);
  }

}
