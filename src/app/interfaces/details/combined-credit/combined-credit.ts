import {Cast} from "../cast/cast";
import {Crew} from "../crew/crew";

export interface CombinedCredit {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
