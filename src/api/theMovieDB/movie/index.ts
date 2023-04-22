import * as movie from "../../app/movie";

import axios from "axios";

interface MovieResponse {
  // Définissez ici les propriétés de la réponse de l'API de film
  titre: string;
  description: string;
  date: string;
  image: string;
}

const TMDB = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

export async function getMovie(param: string): Promise<MovieResponse> {
  const { data } = await TMDB.get<MovieResponse>(
    `/search/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=fr-FR&page=1&include_adult=false&query=${param}`
  );

  return data;
}

export async function getMovieInfo(idMovie: string): Promise<MovieResponse> {
  const bddMovie = await movie.getMovieByIMDB(idMovie);

  if (bddMovie.length === 0) {
    let url = `/movie/${idMovie}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=fr-FR`;

    // Vérifie si les deux premiers caractères de l'ID commencent par "tt"
    if (idMovie.slice(0, 2) === "tt") {
      url = `/find/${idMovie}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&external_source=imdb_id`;
    }

    const { data } = await TMDB.get<MovieResponse>(url);

    movie.insertMovie(data);
    return data;
  } else {
    return bddMovie[0];
  }
}

export async function getSerieInfo(idSerie: string): Promise<MovieResponse> {
  const { data } = await TMDB.get<MovieResponse>(
    `/tv/${idSerie}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=fr-FR`
  );

  return data;
}

export async function getMovieCredit(idMovie: string): Promise<MovieResponse> {
  const { data } = await TMDB.get<MovieResponse>(
    `/movie/${idMovie}/credits?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=fr-FR`
  );

  return data;
}

export async function getSerieCredit(idMovie: string): Promise<MovieResponse> {
  const { data } = await TMDB.get<MovieResponse>(
    `/tv/${idMovie}/credits?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=fr-FR`
  );

  return data;
}

export async function getTopMovies(param: any): Promise<MovieResponse> {
  const { data } = await TMDB.get<MovieResponse>(
    `/trending/movie/week?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
  );

  return data;
}

export async function getTopSeries(param: any): Promise<MovieResponse> {
  const { data } = await TMDB.get<MovieResponse>(
    `/trending/tv/week?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
  );

  return data;
}
