import {Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TitleService extends Title {

  private initialTitle: string = "The Movies Informations | Sven Glauser";

  public override setTitle(newTitle: string) {
    super.setTitle(this.getTitleString(newTitle));
  }

  private getTitleString(newTitle: string): string {
    return newTitle + " | " + this.initialTitle
  }

  public resetTitle() {
    super.setTitle(this.initialTitle);
  }
}
