import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ResultSearchMovie} from "../../interfaces/search/movie/result-search-movie";

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  constructor(public http: HttpClient) { }

  public searchMovies(query: string): Observable<ResultSearchMovie> {
    return this.getRequest<ResultSearchMovie>("/search/movie", [{param: "query", value: query}])
  }

  private getRequest<Type>(url: string, params: { param: string, value: string }[]): Observable<Type> {
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
}
