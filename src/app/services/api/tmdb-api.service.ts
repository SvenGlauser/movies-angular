import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Result} from "../../interfaces/search/result/result";
import {MovieDetails} from "../../interfaces/details/movie/movie-details";
import {TvDetails} from "../../interfaces/details/tv/tv-details";
import {Person} from "../../interfaces/search/person/person";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  constructor(private http: HttpClient,
              private router: Router) { }

  public search(query: string): Observable<Result> {
    return this.getRequest<Result>("/search/multi", [{param: "query", value: query}])
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

    return this.http.get<Type>(environment.api.url + url + parametersString);
  }

  public getMovie(id: number): Observable<MovieDetails> {
    return this.getRequest<MovieDetails>("/movie/" + id).pipe(
      catchError((err, caught) => {
        this.router.navigate([""])
        console.log(err)
        return EMPTY;
      })
    );
  }

  public getTv(id: number): Observable<TvDetails> {
    return this.getRequest<TvDetails>("/tv/" + id).pipe(
      catchError((err, caught) => {
        this.router.navigate([""])
        console.log(err)
        return EMPTY;
      })
    );
  }

  public getPerson(id: number): Observable<Person> {
    return this.getRequest<Person>("/person/" + id).pipe(
      catchError((err, caught) => {
        this.router.navigate([""])
        console.log(err)
        return EMPTY;
      })
    );
  }
}
