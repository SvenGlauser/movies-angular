import {ProductionCompanies} from "../production-companies/production-companies";
import {ProductionCountry} from "../production-country/production-country";
import {SpokenLanguage} from "../spoken-language/spoken-language";
import {Genre} from "../genre/genre";

export interface MovieDetails {
  adult: boolean,
  backdrop_path: string | null,
  belongs_to_collection: null | object,
  budget: number,
  genres: Genre[],
  homepage: string | null,
  id: number,
  imdb_id: string | null,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string | null,
  production_companies: ProductionCompanies[],
  production_countries: ProductionCountry[],
  release_date: Date,
  revenue: number,
  runtime: number,
  spoken_languages: SpokenLanguage[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}
