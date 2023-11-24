import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchPeopleJudicial } from 'src/app/core/model/search-people-judicial';
import { MessageService } from 'src/app/core/service/message.service';
import { SearchPeopleService } from 'src/app/core/service/search-people.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchPeople: SearchPeopleJudicial = new SearchPeopleJudicial();

  constructor(private searchPeopleService: SearchPeopleService,
    private messageService: MessageService
    , private activateRoute: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {

  }

  fnSearchPeople(): void {
    this.searchPeople.searchType = 'people';
    this.router.navigate(['search',this.searchPeople.documentType,this.searchPeople.documentNumber,this.searchPeople.cellphone,this.searchPeople.searchType]);
    

  }

  fnSearchPeopleJudicial(): void {
    this.searchPeople.searchType = 'judicial';
    this.router.navigate(['search',this.searchPeople.documentType,this.searchPeople.documentNumber,this.searchPeople.cellphone,this.searchPeople.searchType]);
  }

}
