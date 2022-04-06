export interface Episode {
  air_date: Date
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string | null
  vote_average: number,
  vote_count: number
}
