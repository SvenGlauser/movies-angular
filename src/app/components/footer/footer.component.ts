import {Component} from '@angular/core';
import packageInfo from '../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  version: string = packageInfo.version;
}
