import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-languagues',
  templateUrl: './switch-languagues.component.html',
  styleUrls: ['./switch-languagues.component.css']
})
export class SwitchLanguaguesComponent implements OnInit {

  options = [{
    value: 'en', display: 'English', selected: false
  },
  { value: 'es', display: 'Español', selected: true }
  ]

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    // Establecer el idioma predeterminado en español
    this.translate.setDefaultLang('es');

    // Usar el idioma predeterminado al cargar la aplicación
    this.translate.use('es');
  }

  onChange = (event: Event) => {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
  }
}
