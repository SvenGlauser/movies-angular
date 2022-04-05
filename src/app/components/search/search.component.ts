import {Component, OnInit} from '@angular/core';
import {TmdbApiService} from "../../services/api/tmdb-api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public tmdbApiService: TmdbApiService) { }

  async ngOnInit() {
    console.log((await this.tmdbApiService.search("test").toPromise())?.results)
  }
}
