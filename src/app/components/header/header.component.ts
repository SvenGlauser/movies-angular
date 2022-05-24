import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  language = new FormControl(localStorage.getItem("language") || "fr-FR", Validators.required);
  languages: {label: string, isoCode: string}[] = [
    {label: "Deutsch", isoCode: "de-DE"},
    {label: "English", isoCode: "en-US"},
    {label: "Français", isoCode: "fr-FR"},
  ];

  changeLanguage() {
    localStorage.setItem("language", this.language.value);
    window.location.reload();
  }
}
