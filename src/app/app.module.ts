import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';

import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { CounterComponent } from './components/counter/counter.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AlliancesComponent } from './components/alliances/alliances.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { ContactService } from './core/service/contact.service';
import { MessageService } from './core/service/message.service';
import { SearchPeopleService } from './core/service/search-people.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ProductsComponent,
    CounterComponent,
    ContactComponent,
    AboutComponent,
    AlliancesComponent,
    FooterComponent,
    WhatsappComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ContactService, MessageService, SearchPeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
