import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieDetails} from "../../../interfaces/details/movie/movie-details";
import {TmdbApiService} from "../../../services/api/tmdb-api.service";
import {environment} from "../../../../environments/environment";
import {TitleService} from "../../../services/title/title.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {

  movie?: MovieDetails;

  constructor(private route: ActivatedRoute,
              private titleService: TitleService,
              private router: Router,
              private tmdbApiService: TmdbApiService) { }

  getBackgroundImage(): string {
    return window.matchMedia("screen and (max-width: 600px)").matches ?
           environment.images.url + environment.images.poster_sizes[6] + this.movie?.poster_path :
           environment.images.url + environment.images.backdrop_sizes[3] + this.movie?.backdrop_path;
  }

  getImage() {
    return environment.images.url + environment.images.poster_sizes[3] + this.movie?.poster_path;
  }

  getTitle() {
    return this.movie?.title + (this.movie?.original_title !== this.movie?.title ? ' (' + this.movie?.original_title + ')' : '');
  }

  ngOnInit(): void {
    this.titleService.resetTitle();
    this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.router.navigate(['/404']).then();
      } else {
        this.tmdbApiService.getMovie(params['id'].toString().split('-')[0]).pipe(
          catchError(err => {
            this.router.navigate(['/404']).then();
            return throwError(err);
          })
        ).subscribe(movie => {
          this.movie = movie;
          this.titleService.setTitle(movie?.title);
        });
      }
    });
  }
}
