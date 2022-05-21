import {Component, Input} from '@angular/core';
import {TvDetails} from "../../../../interfaces/details/tv/tv-details";

@Component({
  selector: 'app-cast-tv',
  templateUrl: './cast-tv.component.html',
  styleUrls: ['./cast-tv.component.css']
})
export class CastTvComponent {

  @Input() tv?: TvDetails;
  @Input() character?: string;
}
