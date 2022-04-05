import {Component, OnInit} from '@angular/core';
import {TmdbApiService} from "./services/api/tmdb-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public tmdbApiService: TmdbApiService) { }

  async ngOnInit() {
    console.log(await this.tmdbApiService.searchMovies("test").toPromise());
  }
}
