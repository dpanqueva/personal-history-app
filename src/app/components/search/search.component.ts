import { Component, OnInit, ElementRef } from '@angular/core';
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
    , private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {

  }

  fnSearchPeople(): void {
    this.searchPeople.searchType = 'people';
    this.fnSaveInitSearchPeople(this.searchPeople);

  }

  fnSearchPeopleJudicial(): void {
    this.searchPeople.searchType = 'judicial';
    this.fnSaveInitSearchPeople(this.searchPeople);
  }

  resolved(response: any) {
    this.captcha = response;
    if (this.captcha) {
      this.confirmHuman = true;
    }
  }

  private fnSaveInitSearchPeople(search: SearchPeopleJudicial) {
    this.searchPeopleService.searchPeople(this.searchPeople).subscribe({
      next: (e) => {
        const referenceLocator = e.message.referenceLocator;
        if (referenceLocator) {
          this.router.navigate(['search', referenceLocator, this.searchPeople.searchType]);
        }

      },
      error: (e) => {
        this.confirmHuman = false;
        this.searchPeople = new SearchPeopleJudicial();
        this.router.navigate(['']);
      }
    });
  }

}
