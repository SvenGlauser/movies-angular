import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Result} from "../../interfaces/search/result/result";
import {MovieDetails} from "../../interfaces/details/movie/movie-details";
import {TvDetails} from "../../interfaces/details/tv/tv-details";
import {Person} from "../../interfaces/search/person/person";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Tv} from "../../interfaces/search/tv/tv";
import {Movie} from "../../interfaces/search/movie/movie";

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) { }

  public searchTv(query: string, page: number = 1): Observable<Result<Tv>> {
    return this.getRequest<Result<Tv>>("/search/tv", [{param: "query", value: query}, {param: "page", value: page.toString()}])
  }

  public searchMovie(query: string, page: number = 1): Observable<Result<Movie>> {
    return this.getRequest<Result<Movie>>("/search/movie", [{param: "query", value: query}, {param: "page", value: page.toString()}])
  }

  public searchPerson(query: string, page: number = 1): Observable<Result<Person>> {
    return this.getRequest<Result<Person>>("/search/person", [{param: "query", value: query}, {param: "page", value: page.toString()}])
  }

  public getRequest<Type>(url: string, params: { param: string, value: string }[] = []): Observable<Type> {
    let parameters = [
      {
        param: "api_key",
        value: environment.api.key,
      },
      {
        param: "language",
        value: environment.api.language,
      }
    ].concat(params);

    let parametersString = "?";

    for (const params of parameters)
      parametersString += "&" + params.param + "=" + params.value;

    return this.http.get<Type>(environment.api.url + url + parametersString).pipe(
      catchError((err, caught) => {
        this.router.navigate([""]);
        this.snackBar.open("Error : " + err.status + " with text : " + err.statusText, "Close")
        console.log(err);
        return EMPTY;
      })
    );
  }

  public getMovie(id: number): Observable<MovieDetails> {
    return this.getRequest<MovieDetails>("/movie/" + id).pipe(
      map(movie => {
        movie.release_date = new Date(movie.release_date);
        return movie;
      })
    );
  }

  public getTv(id: number): Observable<TvDetails> {
    return this.getRequest<TvDetails>("/tv/" + id).pipe(
      map(tv => {
        tv.first_air_date = new Date(tv.first_air_date);
        tv.last_air_date = new Date(tv.last_air_date);
        return tv;
      })
    );
  }

  public getPerson(id: number): Observable<Person> {
    return this.getRequest<Person>("/person/" + id);
  }
}
