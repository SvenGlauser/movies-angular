import {SearchMovie} from "./search-movie";

export interface ResultSearchMovie {
  page: number,
  results: SearchMovie[],
  total_results: number,
  total_pages: number,
}
