import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../../../interfaces/details/movie/movie-details";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-cast-movie',
  templateUrl: './cast-movie.component.html',
  styleUrls: ['./cast-movie.component.css']
})
export class CastMovieComponent {

  @Input() movie?: MovieDetails;
  @Input() character?: string;

  getImage() {
    return environment.images.url + environment.images.poster_sizes[3] + this.movie?.poster_path;
  }

  isSmartphone() {
    return window.matchMedia("(pointer:coarse)").matches;
  }
}
