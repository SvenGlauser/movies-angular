import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TmdbApiService} from "../../../services/api/tmdb-api.service";
import {environment} from "../../../../environments/environment";
import {TvDetails} from "../../../interfaces/details/tv/tv-details";

@Component({
  selector: 'app-view-tv',
  templateUrl: './view-tv.component.html',
  styleUrls: ['./view-tv.component.css']
})
export class ViewTvComponent implements OnInit {

  tv?: TvDetails;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tmdbApiService: TmdbApiService) { }

  getBackgroundImage(): string {
    return window.matchMedia("screen and (max-width: 600px)").matches ?
      environment.images.url + environment.images.poster_sizes[6] + this.tv?.poster_path :
      environment.images.url + environment.images.backdrop_sizes[3] + this.tv?.backdrop_path;
  }

  getImage(): string {
    return environment.images.url + environment.images.poster_sizes[3] + this.tv?.poster_path;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.router.navigate(['/404']).then();
      } else {
        this.tmdbApiService.getTv(params['id'])
          .subscribe(tv => {
            this.tv = tv;
          });
      }
    });
  }
}
