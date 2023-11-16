import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  errorMessage(message: any){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    })
    return throwError(() => message);
  }

  successFullMessage(message: string ){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  warningMessage(message: string){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message
    })
    return throwError(() => message);
  }
}
