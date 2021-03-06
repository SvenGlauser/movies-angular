import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MaterialModule} from "./material/material.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {SearchComponent} from './components/search/search.component';
import {AppRoutingModule} from "./app-routing.modules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieComponent} from './components/search/movie/movie.component';
import {TvComponent} from './components/search/tv/tv.component';
import {PersonComponent} from './components/search/person/person.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ViewMovieComponent} from './components/view/movie/view-movie.component';
import {ChargementComponent} from './components/chargement/chargement.component';
import {ViewTvComponent} from './components/view/tv/view-tv.component';
import {ViewPersonComponent} from './components/view/person/view-person.component';
import {CastMovieComponent} from './components/view/person/cast-movie/cast-movie.component';
import {CastTvComponent} from './components/view/person/cast-tv/cast-tv.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CustomTranslateLoaderService} from "./services/custom-translate-loader/custom-translate-loader.service";
import {environment} from "../environments/environment";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    MovieComponent,
    TvComponent,
    PersonComponent,
    ViewMovieComponent,
    ChargementComponent,
    ViewTvComponent,
    ViewPersonComponent,
    CastMovieComponent,
    CastTvComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): CustomTranslateLoaderService {
  return new CustomTranslateLoaderService(http, environment.baseHref);
}
