import {Movie} from "../movie/movie";
import {Tv} from "../tv/tv";
import {Person} from "../person/person";

export interface Result {
  page: number,
  results: (Movie | Tv | Person)[],
  total_results: number,
  total_pages: number,
}
