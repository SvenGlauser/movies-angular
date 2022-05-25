import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    let lang = this.getLanguage();
    localStorage.setItem('language', lang);
    translate.setDefaultLang(lang);
    translate.use(lang);
  }

  getLanguage(): string {
    let languageArray = Object.keys(environment.api.languages);

    if (languageArray.includes(localStorage.getItem('language') || "")) {
      return String(localStorage.getItem('language'));
    } else if (languageArray.includes(navigator.language)) {
      return navigator.language;
    } else if (languageArray.filter(lang => lang.startsWith(navigator.language)).length > 0) {
      return languageArray.filter(lang => lang.startsWith(navigator.language))[0];
    } else if (navigator.languages.filter(lang => languageArray.includes(lang))) {
      return navigator.languages.filter(lang => languageArray.includes(lang))[0];
    } else {
      return 'fr-FR';
    }
  }
}
