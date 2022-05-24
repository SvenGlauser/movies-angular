import {Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private initialTitle: string = "The Movies Informations | Sven Glauser";

  constructor(private title: Title, private translate: TranslateService) {
    this.resetTitle();
  }

  public setTitle(newTitle: string) {
    this.translate.get('project.name').subscribe(title => {
      this.title.setTitle(newTitle + ' | ' + title + " | Sven Glauser");
    });
  }

  public resetTitle() {
    this.translate.get('project.name').subscribe(title => {
      this.title.setTitle(title);
    });
  }
}
