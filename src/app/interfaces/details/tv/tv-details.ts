import {SpokenLanguage} from "../spoken-language/spoken-language";
import {Season} from "../season/season";
import {ProductionCountry} from "../production-country/production-country";
import {ProductionCompanies} from "../production-companies/production-companies";
import {Network} from "../network/network";
import {Episode} from "../episode/episode";
import {Genre} from "../genre/genre";
import {Creator} from "../creator/creator";

export interface TvDetails {
  backdrop_path: string | null,
  created_by: Creator[],
  episode_run_time: number[],
  first_air_date: Date,
  genres: Genre[],
  homepage: string,
  id: number,
  in_production: boolean,
  languages: string[],
  last_air_date: Date,
  last_episode_to_air: Episode,
  name: string,
  next_episode_to_air: null,
  networks: Network[],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string | null,
  production_companies: ProductionCompanies[]
  production_countries: ProductionCountry[]
  seasons: Season[],
  spoken_languages: SpokenLanguage[],
  status: string,
  tagline: string,
  type: string,
  vote_average: number,
  vote_count: number
}
