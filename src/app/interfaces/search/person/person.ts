import {Tv} from "../tv/tv";
import {Movie} from "../movie/movie";

export interface Person {
  profile_path: string,
  adult: boolean,
  id: number,
  media_type: string,
  known_for: (Tv | Movie)[],
  name: string,
  popularity: number,
}
