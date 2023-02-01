import axios from "axios";
import env from "../../../env";
interface MovieResponse {
  // Définissez ici les propriétés de la réponse de l'API de film
  titre: string;
  description: string;
  date: string;
  image: string;
}

const TMDB = axios.create({
  baseURL: `/api`,
  headers: { pragma: "no-cache" },
});

export async function getMovie(param: string): Promise<MovieResponse> {
  const { data } = await TMDB.get<MovieResponse>(
    `/search/movie?api_key=${env.TMDB_API_KEY}&language=fr-FR&page=1&include_adult=false&query=${param}`
  );
  console.log(data);
  return data;
}
