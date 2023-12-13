import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/common/env/environment.prod';
import { Contact } from 'src/app/core/model/contact';
import { ContactService } from 'src/app/core/service/contact.service';
import { MessageService } from 'src/app/core/service/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  contact: Contact = new Contact();
  captcha: string = "";
  siteKey: string = environment.recaptcha_key;

  constructor(private contactService: ContactService,
    private messageService: MessageService){}

  ngOnInit(): void {

  }

  contactMe():void{
   
    this.contactService.createContact(this.contact).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.contacto_registrado_ok);
        
      },
      error: (e) => {
        //this.errorBadRequest(e);
      },
    });
  }

  resolved(response: any){
    this.captcha= response;
    if(this.captcha){
      this.contactMe();
    }
  }
}
