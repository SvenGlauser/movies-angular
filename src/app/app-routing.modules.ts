import {NgModule} from '@angular/core';
import {SearchComponent} from "./components/search/search.component";
import {RouterModule, Routes} from "@angular/router";
import {ViewMovieComponent} from "./components/view/movie/view-movie.component";
import {ViewTvComponent} from "./components/view/tv/view-tv.component";
import {ViewPersonComponent} from "./components/view/person/view-person.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: SearchComponent,
  },
  {
    path: "view/movie/:id",
    component: ViewMovieComponent,
  },
  {
    path: "view/person/:id",
    component: ViewPersonComponent,
  },
  {
    path: "view/tv/:id",
    component: ViewTvComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
