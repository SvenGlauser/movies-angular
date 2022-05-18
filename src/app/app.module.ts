import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MaterialModule} from "./material/material.module";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {SearchComponent} from './components/search/search.component';
import {AppRoutingModule} from "./app-routing.modules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieComponent} from './components/search/movie/movie.component';
import {TvComponent} from './components/search/tv/tv.component';
import {PersonComponent} from './components/search/person/person.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ViewMovieComponent} from './components/view/movie/view-movie.component';
import { ChargementComponent } from './components/chargement/chargement.component';
import { ViewTvComponent } from './components/view/tv/view-tv.component';

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
    ViewTvComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
