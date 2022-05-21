import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../../../interfaces/details/movie/movie-details";

@Component({
  selector: 'app-cast-movie',
  templateUrl: './cast-movie.component.html',
  styleUrls: ['./cast-movie.component.css']
})
export class CastMovieComponent {

  @Input() movie?: MovieDetails;
  @Input() character?: string;
}
