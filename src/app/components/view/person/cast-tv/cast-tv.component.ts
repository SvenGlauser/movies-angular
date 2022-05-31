import {Component, Input} from '@angular/core';
import {TvDetails} from "../../../../interfaces/details/tv/tv-details";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-cast-tv',
  templateUrl: './cast-tv.component.html',
  styleUrls: ['./cast-tv.component.css']
})
export class CastTvComponent {

  @Input() tv?: TvDetails;
  @Input() departement?: string;
  @Input() character?: string;

  getImage() {
    return environment.images.url + environment.images.poster_sizes[3] + this.tv?.poster_path;
  }

  isSmartphone() {
    return window.matchMedia("only screen and (hover: none)").matches;
  }
}
