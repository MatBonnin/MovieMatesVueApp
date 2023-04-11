import axios from "axios";
import instance from "@/utils/axiosConfig";

export async function authentification(param: any): Promise<any> {
  try {
    const { data } = await instance.post<object>("/auth/login", param);
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

    const raw = await instance.get<object>("/auth/token", {
      headers,
    });
    console.log(raw);
    if (raw.status == 200) {
      const { data }: any = raw;
      const access_token = data.access_token;
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
    const { data } = await instance.get<object>("/users/getInfoUser");
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
