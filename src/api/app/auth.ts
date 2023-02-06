import axios from "axios";
import env from "../../../env";

const TMDB = axios.create({
  baseURL: "http://localhost:3000",
  headers: { pragma: "no-cache" },
});

export async function auth(param: object): Promise<object> {
  try {
    const { data } = await TMDB.post<object>("/users/auth", param);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

export async function getUserInfo(param: any): Promise<object> {
  try {
    const { data } = await TMDB.get<object>("/users/userInfo", param);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}
