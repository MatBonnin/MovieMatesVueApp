import axios from "axios";

const TMDB = axios.create({
  baseURL: "http://localhost:5000",
  headers: { pragma: "no-cache" },
});

export async function getMovieByIMDB(param: string): Promise<any> {
  try {
    const { data } = await TMDB.get<object>("/movie/" + param);
    console.log(data);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
    

  }
}

export async function insertMovie(param: object): Promise<any> {
  try {
    const { data } = await TMDB.post<object>("/movie", param);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
  }
}
