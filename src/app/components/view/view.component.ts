import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number = -1;
  type: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  private isValide() {
    return !isNaN(this.id) && this.id > 0 && (this.type === "person" || this.type === "movie" || this.type === "tv");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.type = params['type'];
      if (!this.isValide())
        this.router.navigate([''])
    })
  }

}
