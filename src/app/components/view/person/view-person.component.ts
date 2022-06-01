import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TitleService} from "../../../services/title/title.service";
import {TmdbApiService} from "../../../services/api/tmdb-api.service";
import {PersonDetails} from "../../../interfaces/details/person/person-details";
import {CombinedCredit} from "../../../interfaces/details/combined-credit/combined-credit";
import {MovieDetails} from "../../../interfaces/details/movie/movie-details";
import {TvDetails} from "../../../interfaces/details/tv/tv-details";
import {environment} from "../../../../environments/environment";
import {Crew} from "../../../interfaces/details/crew/crew";
import {catchError, throwError} from "rxjs";

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
  crew: { element: (MovieDetails | TvDetails), roles: string[], type: string }[] = [];

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
        this.tmdbApiService.getPerson(params['id'].toString().split('-')[0]).pipe(
          catchError(err => {
            this.router.navigate(['/404']).then();
            return throwError(err);
          })
        ).subscribe(person => {
          this.person = person;
          this.titleService.setTitle(person?.name);
          switch (this.person.known_for_department) {
            case "Directing": this.getFilmsAndTVCrew(); break;
            case "Acting": this.getFilmsAndTVCast(); break;
            default: this.getFilmsAndTVCast(); break;
          }
        });
      }
    });
  }

  getFilmsAndTVCast(): void {
    this.tmdbApiService.getPersonCredit(Number(this.person?.id)).subscribe(credit => {
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
  }

  getFilmsAndTVCrew(): void {
    this.tmdbApiService.getPersonCredit(Number(this.person?.id)).subscribe(credit => {
      let map = new Map<string, Crew[]>();

      credit.crew.sort((a, b) => b.popularity - a.popularity).forEach(crew => {
        let actual = map.get(String(crew.id).concat(crew.media_type));
        if (actual === undefined) {
          actual = Array(crew);
        } else {
          actual = actual.concat(Array(crew));
        }
        map.set(String(crew.id).concat(crew.media_type), actual);
      });

      map = new Map(Array.from(map).slice(0, 10));

      let chargement = map.size;
      map.forEach((crew, key) => {
        if (crew[0].media_type === 'movie') {
          this.tmdbApiService.getMovie(crew[0].id).subscribe(movie => {
            this.crew.push({element: movie, roles: crew.map(element => element.department), type: 'movie'});
            chargement--;
            if (chargement === 0) {
              this.setBackgroundImage();
              this.chargement = false;
            }
          });
        } else if (crew[0].media_type === 'tv') {
          this.tmdbApiService.getTv(crew[0].id).subscribe(tv => {
            this.crew.push({element: tv, roles: crew.map(element => element.department), type: 'tv'});
            chargement--;
            if (chargement === 0) {
              this.setBackgroundImage();
              this.chargement = false;
            }
          });
        }
      });
    });
  }

  getImage() {
    return environment.images.url + environment.images.poster_sizes[3] + this.person?.profile_path;
  }

  setBackgroundImage() {
    let backgroundImage = '';

    let filmsAndTv = this.person?.known_for_department === 'Directing' ? this.crew : this.filmsAndTv;

    if (filmsAndTv.length > 0) {
      [...Array(filmsAndTv.length).keys()].sort((a, b) => 0.5 - Math.random()).forEach(index => {
        if (backgroundImage === '') {
          if (window.matchMedia("screen and (max-width: 600px)").matches) {
            if (filmsAndTv[index].element.poster_path !== null) {
              backgroundImage = environment.images.url + environment.images.poster_sizes[6] + filmsAndTv[index].element?.poster_path;
            }
          } else {
            if (filmsAndTv[index].element.backdrop_path !== null) {
              backgroundImage = environment.images.url + environment.images.poster_sizes[6] + filmsAndTv[index].element?.backdrop_path;
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

  getUrl(id: number, title: string): string {
    return id.toString().concat('-', title.replace(/\s/g, '-').toLowerCase());
  }
}
