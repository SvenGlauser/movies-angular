import {Component, OnInit} from '@angular/core';
import {TmdbApiService} from "../../services/api/tmdb-api.service";
import {Result} from "../../interfaces/search/result/result";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  result: Result = {page: 0, results: [], total_pages: 0, total_results: 0};

  constructor(public tmdbApiService: TmdbApiService) { }

  async search(): Promise<void> {
    this.result = <Result>(await this.tmdbApiService.search("test").toPromise());
  }

  ngOnInit(): void {
    this.search()
  }
}
