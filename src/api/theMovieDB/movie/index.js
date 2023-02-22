import axios from "axios";
import env from "../../../../env";
const TMDB = axios.create({
    baseURL: `/api`,
    headers: { pragma: "no-cache" },
});
export async function getMovie(param) {
    const { data } = await TMDB.get(`/search/movie?api_key=${env.TMDB_API_KEY}&language=fr-FR&page=1&include_adult=false&query=${param}`);
    console.log(data);
    return data;
}
export async function getMovieInfo(idMovie) {
    const { data } = await TMDB.get(`/movie/${idMovie}?api_key=${env.TMDB_API_KEY}&language=fr-FR`);
    console.log(data);
    return data;
}
export async function getMovieCredit(idMovie) {
    const { data } = await TMDB.get(`/movie/${idMovie}/credits?api_key=${env.TMDB_API_KEY}&language=fr-FR`);
    console.log(data);
    return data;
}
export async function getTopMovies(param) {
    console.log("topMovies");
    const { data } = await TMDB.get(`/trending/movie/week?api_key=${env.TMDB_API_KEY}`);
    console.log(data);
    return data;
}
export async function getTopSeries(param) {
    console.log("topMovies");
    const { data } = await TMDB.get(`/trending/tv/week?api_key=${env.TMDB_API_KEY}`);
    console.log(data);
    return data;
}
//# sourceMappingURL=index.js.map