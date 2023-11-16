import { Component, OnInit } from '@angular/core';
import { SearchPeopleJudicial } from 'src/app/core/model/search-people-judicial';
import { MessageService } from 'src/app/core/service/message.service';
import { SearchPeopleService } from 'src/app/core/service/search-people.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchPeople: SearchPeopleJudicial = new SearchPeopleJudicial();
  searchJudicial: SearchPeopleJudicial = new SearchPeopleJudicial();

  constructor(private searchPeopleService: SearchPeopleService,
    private messageService: MessageService){}

  ngOnInit(): void {

  }

  fnPearchPeople():void{
    this.searchPeopleService.searchPeople(this.searchPeople).subscribe({
      next: (e)=>{
        this.messageService.successFullMessage('');
      }
    });
  }

}
