import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Contact } from '../model/contact';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/common/env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private urlEndPoint: string = environment.base_url + 'contact-me';

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

  createContact(contact: Contact): Observable<Contact>{
    return this.http
      .post<Contact>(this.urlEndPoint, contact, {
        headers: this.addAuthorizationHeader(),
      })
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
