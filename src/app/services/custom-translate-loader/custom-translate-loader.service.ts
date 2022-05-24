import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {TranslateLoader} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateLoaderService implements TranslateLoader {
  contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  private readonly baseHref;

  constructor(private httpClient: HttpClient, @Inject('baseHref') baseHref: string = "") {
    this.baseHref = baseHref;
  }
  getTranslation(lang: string): Observable<any> {
    const apiAddress = this.baseHref + `/assets/i18n/${lang}.json`;
    return this.httpClient.get(apiAddress, { headers: this.contentHeader })
      .pipe(
        catchError(_ => this.httpClient.get(this.baseHref + `/assets/i18n/fr-FR.json`))
      );
  }
}
