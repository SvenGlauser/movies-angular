import {Component} from '@angular/core';
import {TmdbApiService} from "../../services/api/tmdb-api.service";
import {Result} from "../../interfaces/search/result/result";
import {Tv} from "../../interfaces/search/tv/tv";
import {Movie} from "../../interfaces/search/movie/movie";
import {Person} from "../../interfaces/search/person/person";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  private result: Result = {page: 0, results: [], total_pages: 0, total_results: 0};

  type: string = "";

  constructor(private tmdbApiService: TmdbApiService,
              private router: Router) { }

  async search(value: string): Promise<void> {
    this.result = <Result>(await this.tmdbApiService.search(value).toPromise());
    this.type = this.getTypes().length > 0 ? this.getTypes()[0] : "";
  }

  open(resultElement: Movie | Tv | Person) {
      this.router.navigate(["view/" + resultElement.media_type + "/" + resultElement.id]);
  }

  getTypes() {
    return [...new Set(this.result.results.map(value => value.media_type))].sort((a, b) => a < b ? -1 : 1);
  }

  getResults() {
    let result = this.result.results;
    return result.filter(value => value.media_type === this.type);
  }

  castToMovie(value: Movie | Tv | Person): Movie {
    return <Movie>value;
  }

  castToTv(value: Movie | Tv | Person): Tv {
    return <Tv>value;
  }

  castToPerson(value: Movie | Tv | Person): Person {
    return <Person>value;
  }
}
