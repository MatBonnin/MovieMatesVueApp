import axios from "axios";
import instance from "@/utils/axiosConfig";

export async function authentification(param: any): Promise<any> {
  try {
    const { data } = await instance.post<any>("auth/login", param);

    return data;
  } catch (e: any) {
    // eslint-disable-next-line
    return "errey";
  }
}

export async function getToken(param: any): Promise<object> {
  try {
    const headers = {
      Authorization: `Basic ${btoa(param.email + ":" + param.password)}`,
    };

    const raw = await instance.get<object>("/auth/token", {
      headers,
    });

    if (raw.status == 200) {
      const { data }: any = raw;
      const access_token = data.access_token;
      localStorage.setItem("jwt-session", access_token);
      return access_token;
    }
    return raw;
  } catch (e) {
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
