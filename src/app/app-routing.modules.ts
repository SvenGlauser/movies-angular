import {NgModule} from '@angular/core';
import {SearchComponent} from "./components/search/search.component";
import {RouterModule, Routes} from "@angular/router";
import {ViewComponent} from "./components/view/view.component";

const routes: Routes = [
  {
    path: "",
    component: SearchComponent,
  },
  {
    path: "view/:type/:id",
    component: ViewComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
