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
  { value: 'es', display: 'Español', selected: false }
  ]

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    const defaultLanguage = this.translate.getBrowserLang();
    const selectedOption = this.options.find((option) => option.value === defaultLanguage);
    if (selectedOption) {
      selectedOption.selected = true;
    }
    
  }

  onChange = (event: Event) => {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
  }
}
