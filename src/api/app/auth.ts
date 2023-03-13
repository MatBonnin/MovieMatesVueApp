import axios from "axios";

const TMDB = axios.create({
  baseURL: "http://localhost:5000",
  headers: { pragma: "no-cache" },
});

export async function auth(param: object): Promise<any> {
  try {
    const { data } = await TMDB.post<object>("/users/login", param);
    console.log(data);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
    

  }
}

export async function getToken(param: any): Promise<object> {
  try {
    console.log("param", param);
    const headers = {
      Authorization: `Basic ${btoa(param.email + ":" + param.password)}`,
    };

    const raw = await TMDB.get<object>("/auth/token", {
      headers,
    });
    console.log(raw);
    if (raw.status == 200) {
      const { data }: any = raw;
      const access_token = data.access_token;
      console.log(access_token);
      localStorage.setItem("jwt-session", access_token);
      return access_token;
    }
    return raw;
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

// async connexion(username, password) {
//     const url = `${this.api}auth`;
//     const headers = new Headers();
//     headers.append("Authorization", "Basic " + btoa(username + ":" + password));
//     const raw = await fetch(url, { mode: 'cors', headers: headers });
//     if (raw.status == 200) {
//         const json = await raw.json();
//         const token = json.access_token;
//         localStorage.setItem('jwt-session', token);
//         return token;
//     }
//     else {
//         return null;
//     }
// }
