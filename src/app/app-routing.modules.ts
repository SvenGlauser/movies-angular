import {NgModule} from '@angular/core';
import {SearchComponent} from "./components/search/search.component";
import {RouterModule, Routes} from "@angular/router";
import {ViewMovieComponent} from "./components/view/movie/view-movie.component";
import {ViewTvComponent} from "./components/view/tv/view-tv.component";

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
    component: ViewMovieComponent,
  },
  {
    path: "view/tv/:id",
    component: ViewTvComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
