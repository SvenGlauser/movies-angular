import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {TitleService} from "../../services/title/title.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private translate: TranslateService,
              private titleService: TitleService) { }

  ngOnInit() {
    this.translate.get('project.titles.404').subscribe(title => {
      this.titleService.setTitle(title);
    });
  }
}
