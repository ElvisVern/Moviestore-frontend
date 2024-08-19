import { baseUrl } from "./base-request";
import { BaseResponse } from "./base-response";

export interface IMovieRequest {
  q?: string;
  page?: number;
  take?: number;
  [key: string]: any;
}

export interface IMoviesResponse {
  data: Movie[];
  meta: PageMeta
}

export interface PageMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
}

export interface Movie {
  id: string;
  title: string;
  releaseDate: number;
  genre: string;
  rating: number;
  poster: string;
}

const url = `${baseUrl}/api/movies`

async function fetchMovies(queryParams: IMovieRequest) {
  const filteredParams = Object.keys(queryParams)
    .filter((key) => queryParams[key])
    .reduce((obj: any, key) => {
      obj[key] = queryParams[key];
      return obj;
    }, {});
  const searchParams = new URLSearchParams(filteredParams);

  try {
    const response = await fetch(`${url}?${searchParams.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as BaseResponse<IMoviesResponse>;
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

export default fetchMovies;