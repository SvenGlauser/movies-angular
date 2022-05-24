import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  language = new FormControl(localStorage.getItem("language") || "fr-FR", Validators.required);

  changeLanguage() {
    localStorage.setItem("language", this.language.value);
    window.location.reload();
  }
}
