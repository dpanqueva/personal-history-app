import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/common/env/environment.prod';
import { Observable, catchError, throwError } from 'rxjs';
import { SearchPeopleJudicial } from '../model/search-people-judicial';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SearchPeopleService {

  private urlEndPoint: string = environment.base_url_init;
  errors: string[] = [];

  constructor(private http: HttpClient
    ,private messageService: MessageService) { }

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private addAuthorizationHeader() {
    let token = null;//this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', token);
    }
    return this.httpHeaders;
  }

  searchPeople(search: SearchPeopleJudicial):Observable<SearchPeopleJudicial>{
    return this.http.post<SearchPeopleJudicial>(this.urlEndPoint.concat('init-search-people'), search,{headers: this.addAuthorizationHeader()})
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  searchPeopleConfirm(referenceLocator: string):Observable<SearchPeopleJudicial>{
    return this.http.get<SearchPeopleJudicial>(this.urlEndPoint.concat('intention-search-pay').concat("/").concat(referenceLocator), {headers: this.addAuthorizationHeader()})
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  searchPayConfirmStatus(referenceLocator: string):Observable<SearchPeopleJudicial>{
    return this.http.get<SearchPeopleJudicial>(this.urlEndPoint.concat('intention-pay').concat("/").concat(referenceLocator), {headers: this.addAuthorizationHeader()})
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }


  private errorsApiGenerate(e: any) {

    if (e.status == 400) {
      return this.messageService.warningMessageBadRequest(e);
    }
    if (e.status == 404) {
      return this.messageService.errorMessage(
        environment.mensaje_no_encontrado
      );
    }
    if (e.status == 500) {
      return this.messageService.errorMessage(
        environment.mensaje_internal_error
      );
    }

    return this.messageService.errorMessage(environment.mensaje_error);
  }
}
