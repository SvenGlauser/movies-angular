import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TitleService} from "../../../services/title/title.service";
import {TmdbApiService} from "../../../services/api/tmdb-api.service";
import {PersonDetails} from "../../../interfaces/details/person/person-details";
import {CombinedCredit} from "../../../interfaces/details/combined-credit/combined-credit";
import {Cast} from "../../../interfaces/details/cast/cast";
import {Movie} from "../../../interfaces/search/movie/movie";
import {Tv} from "../../../interfaces/search/tv/tv";
import {MovieDetails} from "../../../interfaces/details/movie/movie-details";
import {TvDetails} from "../../../interfaces/details/tv/tv-details";

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})
export class ViewPersonComponent implements OnInit {

  person?: PersonDetails;
  credit?: CombinedCredit;
  filmsAndTv: { element: (MovieDetails | TvDetails), character: string }[] = [];

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
            credit.cast.slice(0, credit.cast.length > 10 ? 10 : credit.cast.length).sort((a, b) => b.popularity - a.popularity).forEach(cast => {
              if (cast.media_type === 'movie') {
                this.tmdbApiService.getMovie(cast.id).subscribe(movie => {
                  this.filmsAndTv.push({element: movie, character: cast.character});
                  console.log(this.filmsAndTv);
                });
              } else if (cast.media_type === 'tv') {
                this.tmdbApiService.getTv(cast.id).subscribe(tv => {
                  this.filmsAndTv.push({element: tv, character: cast.character});
                  console.log(this.filmsAndTv);
                });
              }
            });
          });
        });
      }
    });
  }

}
