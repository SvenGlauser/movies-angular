import {Component, OnInit} from '@angular/core';
import {TmdbApiService} from "../../services/api/tmdb-api.service";
import {Result} from "../../interfaces/search/result/result";
import {Tv} from "../../interfaces/search/tv/tv";
import {Movie} from "../../interfaces/search/movie/movie";
import {Person} from "../../interfaces/search/person/person";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TitleService} from "../../services/title/title.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tvs?: Result<Tv>;
  movies?: Result<Movie>;
  trendingTvs?: Result<Tv>;
  trendingMovies?: Result<Movie>;
  persons?: Result<Person>;
  searchValue: FormControl = new FormControl(undefined);
  searchedValue?: string;

  chargement: number = 0;
  filter: FormControl = new FormControl('', [Validators.required]);

  constructor(private tmdbApiService: TmdbApiService,
              private titleService: TitleService,
              private route: ActivatedRoute,
              public router: Router,
              private translate: TranslateService) {}

  search() {
    this.setFilter();
    this.searchPerson();
    this.searchTV();
    this.searchMovie();
    this.searchedValue = this.searchValue.value;
  }

  setFilter(value?: string) {
    if (value === undefined) {
      this.filter.setValue('');
    } else if (this.filter.value === 'tv' && value === 'movie') {
      this.filter.setValue('movie');
    } else if (this.filter.value !== 'movie') {
      this.filter.setValue(value);
    }
  }

  searchMovie(page?: number) {
    this.chargement++;
    this.tmdbApiService.searchMovie(this.searchValue.value, page).subscribe(movies => {
      this.movies = movies;
      this.chargement--;
      if (this.movies && this.movies.results.length > 0)
        this.setFilter('movie');
    });
  }

  searchTV(page?: number) {
    this.chargement++;
    this.tmdbApiService.searchTv(this.searchValue.value, page).subscribe(tvs => {
      this.tvs = tvs;
      this.chargement--;
      if (this.tvs && this.tvs.results.length > 0)
        this.setFilter('tv');
    });
  }

  searchPerson(page?: number) {
    this.chargement++;
    this.tmdbApiService.searchPerson(this.searchValue.value, page).subscribe(persons => {
      this.persons = persons;
      this.chargement--;
      if (this.persons && this.persons.results.length > 0)
        this.setFilter('person');
    });
  }

  trending() {
    this.tmdbApiService.trendingTv().subscribe(trendingTvs => {
      this.trendingTvs = trendingTvs;
    });
    this.tmdbApiService.trendingMovie().subscribe(trendingMovies => {
      this.trendingMovies = trendingMovies;
    });
  }

  mapToTv(element: any): Tv {
    return <Tv>element;
  }

  mapToMovie(element: any): Movie {
    return <Movie>element;
  }

  getTrending(): (Tv | Movie)[] {
    return new Array<any>().concat(this.trendingTvs ? this.trendingTvs.results : [], this.trendingMovies ? this.trendingMovies.results : []).sort((a, b) => {
      return b.popularity - a.popularity;
    });
  }

  hasPersons() {
    return this.persons !== undefined && this.persons.results.length !== 0
  }

  hasMovies() {
    return this.movies !== undefined && this.movies.results.length !== 0
  }

  hasTVs() {
    return this.tvs !== undefined && this.tvs.results.length !== 0
  }

  isValidSearchString(query?: string) {
    return query && new RegExp(".*\\S.*[a-zA-z0-9 ]").test(query);
  }

  getUrl(id: number, title: string): string {
    return id.toString().concat('-', title.replace(/\s/g, '-').toLowerCase());
  }

  ngOnInit(): void {
    this.titleService.resetTitle();
    this.route.queryParams.subscribe(params => {
      if (this.isValidSearchString(params['search'])) {
        this.searchValue.setValue(params['search']);
        this.searchValue.markAllAsTouched();
        this.trendingTvs = undefined;
        this.trendingMovies = undefined;
        this.search();
        this.translate.get('project.titles.search').subscribe(title => {
          this.titleService.setTitle(title + ` ${params['search']}`);
        });
      } else {
        this.tvs = undefined;
        this.movies = undefined;
        this.persons = undefined;
        this.searchValue.setValue('');
        this.searchedValue = undefined;
        this.trending();
        this.translate.get('project.titles.trending').subscribe(title => {
          this.titleService.setTitle(title);
        });
      }
    });
  }

  isSmartphone() {
    return window.matchMedia("screen and (max-width: 400px)").matches;
  }
}
