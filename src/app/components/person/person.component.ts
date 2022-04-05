import {Component, Input} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Person} from "../../interfaces/search/person/person";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {

  @Input() person: Person = {
    adult: false,
    id: 0,
    known_for: [],
    media_type: "",
    name: "",
    popularity: 0,
    profile_path: ""
  };

  constructor() { }

  getImage() {
    // TODO enlever l'index et créer un objet json
    if (this.person.profile_path === null)
      return "assets/image_not_found.png";
    return environment.images.url + environment.images.profile_sizes[2] + this.person.profile_path;
  }
}
