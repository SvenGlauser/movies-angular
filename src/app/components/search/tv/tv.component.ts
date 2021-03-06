import {Component, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Tv} from "../../../interfaces/search/tv/tv";

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent {

  @Input() tv: Tv = {
    backdrop_path: "",
    first_air_date: new Date(),
    genre_ids: [],
    id: 0,
    media_type: "",
    name: "",
    origin_country: "",
    original_language: "",
    original_name: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    vote_average: 0,
    vote_count: 0
  };

  constructor() { }

  getImage() {
    // TODO enlever l'index et créer un objet json
    if (this.tv.poster_path === null)
      return "assets/image_not_found.png";
    return environment.images.url + environment.images.poster_sizes[3] + this.tv.poster_path;
  }

  getConicGradient(): {background: string} {
    let deg = this.tv.vote_average * 36;

    let color = String("rgba(" + String((255 * (100 - this.tv.vote_average * 10)) / 100) + "," + String((255 * this.tv.vote_average * 10) / 100) + "," + 0) + ")";

    return {background: "conic-gradient(" + color + " " + deg + "deg, #eee " + deg + "deg)"};
  }
}
