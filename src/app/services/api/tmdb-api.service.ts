import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Result} from "../../interfaces/search/result/result";
import {MovieDetails} from "../../interfaces/details/movie/movie-details";

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  constructor(public http: HttpClient) { }

  public search(query: string): Observable<Result> {
    return this.getRequest<Result>("/search/multi", [{param: "query", value: query}])
  }

  private getRequest<Type>(url: string, params: { param: string, value: string }[] = []): Observable<Type> {
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
    return this.getRequest<MovieDetails>("/movie/" + id);
  }
}
