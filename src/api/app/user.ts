import axios from "axios";
import instance from "@/utils/axiosConfig";

export async function createUser(param: any): Promise<any> {
  try {
    const { data } = await instance.post<object>("/users/create", param);
    console.log(data);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
    

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
