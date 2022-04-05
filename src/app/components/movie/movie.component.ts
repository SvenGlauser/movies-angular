import {Component, Input} from '@angular/core';
import {Movie} from "../../interfaces/search/movie/movie";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  @Input() movie: Movie = {
    adult: false,
    backdrop_path: null,
    genre_ids: [],
    id: 0,
    media_type: "",
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    release_date: new Date(),
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0
  };

  constructor() { }

  getImage() {
    // TODO enlever l'index et créer un objet json
    return environment.images.url + environment.images.poster_sizes[3] + this.movie.poster_path;
  }
}
