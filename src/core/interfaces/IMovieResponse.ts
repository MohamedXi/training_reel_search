import { IMovie } from "./IMovie";

export interface IMovieResponse {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}