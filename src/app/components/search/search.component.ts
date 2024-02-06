import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/common/env/environment.prod';
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
  captcha: string = "";
  confirmHuman: boolean = false;
  siteKey: string = environment.recaptcha_key;

  constructor(private searchPeopleService: SearchPeopleService,
    private messageService: MessageService
    , private activateRoute: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {

  }

  fnSearchPeople(): void {
    this.searchPeople.searchType = 'people';
    this.confirmHuman = true;
  }

  fnSearchPeopleJudicial(): void {
    this.searchPeople.searchType = 'judicial';
    this.confirmHuman = true;
  }

  resolved(response: any) {
    this.captcha = response;
    if (this.captcha) {
      this.confirmHuman = false;
      this.fnSaveInitSearchPeople(this.searchPeople);
    }
  }

  private fnSaveInitSearchPeople(search: SearchPeopleJudicial) {
    this.searchPeopleService.searchPeople(this.searchPeople).subscribe({
      next: (e) => {
        this.confirmHuman = false;
        this.router.navigate(['search', e.id]);
      },
      error: (e) => {
        this.confirmHuman = false;
        this.searchPeople = new SearchPeopleJudicial();
        this.router.navigate(['']);
      }
    });
  }
}
