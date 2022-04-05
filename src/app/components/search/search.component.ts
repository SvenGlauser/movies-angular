import {Component, OnInit} from '@angular/core';
import {TmdbApiService} from "../../services/api/tmdb-api.service";
import {Result} from "../../interfaces/search/result/result";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private result: Result = {page: 0, results: [], total_pages: 0, total_results: 0};

  type: string = "";

  constructor(public tmdbApiService: TmdbApiService) { }

  async search(): Promise<void> {
    this.result = <Result>(await this.tmdbApiService.search("tom cruise").toPromise());
    this.type = this.getTypes().length > 0 ? this.getTypes()[0] : "";
  }

  getTypes() {
    return [...new Set(this.result.results.map(value => value.media_type))].sort((a, b) => a < b ? -1 : 1);
  }

  getResults() {
    let result = this.result.results;
    return result.filter(value => value.media_type === this.type);
  }

  ngOnInit(): void {
    this.search().then();
  }
}
