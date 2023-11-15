import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/core/model/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  contact: Contact = new Contact();

  constructor(){}

  ngOnInit(): void {

  }

  contactMe():void{
    console.log('contact' + this.contact.name);
  }
}
