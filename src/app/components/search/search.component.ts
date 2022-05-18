import {Component, OnInit} from '@angular/core';
import {TmdbApiService} from "../../services/api/tmdb-api.service";
import {Result} from "../../interfaces/search/result/result";
import {Tv} from "../../interfaces/search/tv/tv";
import {Movie} from "../../interfaces/search/movie/movie";
import {Person} from "../../interfaces/search/person/person";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tvs?: Result<Tv>;
  movies?: Result<Movie>;
  persons?: Result<Person>;
  searchValue: FormControl = new FormControl(undefined, [Validators.required]);

  chargement: number = 0;
  filter: FormControl = new FormControl('', [Validators.required]);

  constructor(private tmdbApiService: TmdbApiService,
              private router: Router) {}

  search() {
    if (this.searchValue.valid) {
      this.setFilter();
      this.searchPerson();
      this.searchTV();
      this.searchMovie();
      sessionStorage.setItem('search', this.searchValue.value);
    } else {
      this.tvs = undefined;
      this.movies = undefined;
      this.persons = undefined;
    }
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

  hasPersons() {
    return this.persons !== undefined && this.persons.results.length !== 0
  }

  hasMovies() {
    return this.movies !== undefined && this.movies.results.length !== 0
  }

  hasTVs() {
    return this.tvs !== undefined && this.tvs.results.length !== 0
  }

  ngOnInit(): void {
    this.searchValue.setValue(sessionStorage.getItem("search"));
    this.search();
  }
}
