import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  language = new FormControl(localStorage.getItem("language") || "fr-FR", Validators.required);
  languages = environment.api.languages;
  changeLanguage() {
    localStorage.setItem("language", this.language.value);
    window.location.reload();
  }
}
