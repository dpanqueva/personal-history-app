import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private translateService: TranslateService) { }
  oErrors: string[] = [];
  errorMessage(property: string) {
    let message = this.translateMessage(property);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    })
    return throwError(() => message);
  }

  successFullMessage(property: string) {
    let message = this.translateMessage(property);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  warningMessage(property: string) {
    let message = this.translateMessage(property);
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: this.translateMessage(property)
    })
    return throwError(() => message);
  }

  warningMessageBadRequest(errors: any) {
    let message = "";
    if(errors.error.error){
      message = this.errorMessageBadRequestFields(errors);
    }
    if(errors.error.code){
      message = this.errorMessageBadRequestLimitExeption(errors.error.code);
    }
    
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message
    })
    return throwError(() => message);
  }

  private errorMessageBadRequestFields(errors: any){
    this.oErrors = errors.error.error;
    let message: string[] = [];
    var i = 0;
    this.oErrors.forEach((error: string) => {
      message[i] = this.translateMessage(error);
      i++;
    });
    return message.toString();
  }

  private errorMessageBadRequestLimitExeption(error: any){
    return this.translateMessage(error);

  }

  private translateMessage(property: string) {
    let text = '';
    this.translateService
      .get(property)
      .subscribe((messageTranslated: string) => {
        text = messageTranslated
      });
    return text;
  }
}
