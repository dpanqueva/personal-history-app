import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private translateService: TranslateService) { }

  errorMessage(message: any){
    debugger
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.translateMessage(message)
    })
    return throwError(() => message);
  }

  successFullMessage(message: string ){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: this.translateMessage(message),
      showConfirmButton: false,
      timer: 1500
    })
  }

  warningMessage(message: string){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: this.translateMessage(message)
    })
    return throwError(() => message);
  }

  private translateMessage(message: any){
    return this.translateService.instant(message);
  }
}
