import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TitleService} from "../../../services/title/title.service";
import {TmdbApiService} from "../../../services/api/tmdb-api.service";
import {PersonDetails} from "../../../interfaces/details/person/person-details";
import {CombinedCredit} from "../../../interfaces/details/combined-credit/combined-credit";
import {MovieDetails} from "../../../interfaces/details/movie/movie-details";
import {TvDetails} from "../../../interfaces/details/tv/tv-details";
import {environment} from "../../../../environments/environment";
import {Tv} from "../../../interfaces/search/tv/tv";
import {Movie} from "../../../interfaces/search/movie/movie";

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})
export class ViewPersonComponent implements OnInit {

  private readonly genreExclure = [10763, 10764, 10767];

  person?: PersonDetails;
  credit?: CombinedCredit;
  chargement: boolean = true;
  backgroundImage: string = "";
  filmsAndTv: { element: (MovieDetails | TvDetails), character: string, type: string }[] = [];

  constructor(private route: ActivatedRoute,
              private titleService: TitleService,
              private router: Router,
              private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.titleService.resetTitle();
    this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.router.navigate(['/404']).then();
      } else {
        this.tmdbApiService.getPerson(params['id'].toString().split('-')[0]).subscribe(person => {
          this.person = person;
          this.titleService.setTitle(person?.name);
          this.tmdbApiService.getPersonCredit(person.id).subscribe(credit => {
            let filmAndTv = credit.cast.sort((a, b) => b.popularity - a.popularity);
            let filmAndTvFiltered = filmAndTv.filter(element => !(element.media_type === 'tv' && element.genre_ids.filter(genre => this.genreExclure.includes(genre)).length > 0));
            if (filmAndTvFiltered.length >= 10) {
              filmAndTv = filmAndTvFiltered.slice(0, 10);
            } else {
              filmAndTv = filmAndTv.slice(0, 10);
            }

            let chargement = filmAndTv.length;
            filmAndTv.forEach(cast => {
              if (cast.media_type === 'movie') {
                this.tmdbApiService.getMovie(cast.id).subscribe(movie => {
                  this.filmsAndTv.push({element: movie, character: cast.character, type: 'movie'});
                  chargement--;
                  if (chargement === 0) {
                    this.setBackgroundImage();
                    this.chargement = false;
                  }
                });
              } else if (cast.media_type === 'tv') {
                this.tmdbApiService.getTv(cast.id).subscribe(tv => {
                  this.filmsAndTv.push({element: tv, character: cast.character, type: 'tv'});
                  chargement--;
                  if (chargement === 0) {
                    this.setBackgroundImage();
                    this.chargement = false;
                  }
                });
              }
            });
          });
        });
      }
    });
  }

  getImage() {
    return environment.images.url + environment.images.poster_sizes[3] + this.person?.profile_path;
  }

  setBackgroundImage() {
    let backgroundImage = '';
    if (this.filmsAndTv.length > 0) {
      [...Array(this.filmsAndTv.length).keys()].sort((a, b) => 0.5 - Math.random()).forEach(index => {
        if (backgroundImage === '') {
          if (window.matchMedia("screen and (max-width: 600px)").matches) {
            if (this.filmsAndTv[index].element.poster_path !== null) {
              backgroundImage = environment.images.url + environment.images.poster_sizes[6] + this.filmsAndTv[index].element?.poster_path;
            }
          } else {
            if (this.filmsAndTv[index].element.backdrop_path !== null) {
              backgroundImage = environment.images.url + environment.images.poster_sizes[6] + this.filmsAndTv[index].element?.backdrop_path;
            }
          }
        }
      })
    }

    this.backgroundImage = backgroundImage;
  }

  mapToTv(element: any): TvDetails {
    return <TvDetails>element;
  }

  mapToMovie(element: any): MovieDetails {
    return <MovieDetails>element;
  }
}
