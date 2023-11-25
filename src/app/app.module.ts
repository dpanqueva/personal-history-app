import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
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
import { LoaderComponent } from './components/loader/loader.component';
import { FindingPersonComponent } from './components/finding-person/finding-person.component';
import { HttpInterceptorInterceptor } from './core/interceptors/http-interceptor.interceptor';
import { HomeComponent } from './components/home/home.component';
import { ROUTES } from './common/routing/routes.module';
import { SwitchLanguaguesComponent } from './components/switch-languagues/switch-languagues.component';




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
    WhatsappComponent,
    LoaderComponent,
    FindingPersonComponent,
    HomeComponent,
    SwitchLanguaguesComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: httLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ContactService, MessageService, SearchPeopleService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httLoaderFactory(http: HttpClient){
return new TranslateHttpLoader(http,'./assets/i18/', '.json');
}
