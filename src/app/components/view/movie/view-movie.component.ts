import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieDetails} from "../../../interfaces/details/movie/movie-details";
import {TmdbApiService} from "../../../services/api/tmdb-api.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {

  movie?: MovieDetails;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tmdbApiService: TmdbApiService) { }

  getBackgroundImage(): string {
    return environment.images.url + environment.images.backdrop_sizes[3] + this.movie?.backdrop_path;
  }

  getImage() {
    return environment.images.url + environment.images.poster_sizes[3] + this.movie?.poster_path;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.router.navigate(['/404']).then();
      } else {
        this.tmdbApiService.getMovie(params['id'])
          .subscribe(movie => {
            this.movie = movie;
          });
      }
    });
  }
}
