import axios from "axios";
const TMDB = axios.create({
    baseURL: "http://localhost:3000",
    headers: { pragma: "no-cache" },
});
export async function auth(param) {
    try {
        const { data } = await TMDB.post("/users/auth", param);
        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e);
        return { error: e };
    }
}
export async function getToken(param) {
    try {
        console.log("param", param);
        const headers = {
            Authorization: `Basic ${btoa(param.email + ":" + param.password)}`,
        };
        const raw = await TMDB.get("/auth/token", {
            headers,
        });
        console.log(raw);
        if (raw.status == 200) {
            const { data } = raw;
            const access_token = data.access_token;
            console.log(access_token);
            localStorage.setItem("jwt-session", access_token);
            return access_token;
        }
        return raw;
    }
    catch (e) {
        console.log(e);
        return { error: e };
    }
}
export async function getUserInfo(param) {
    try {
        const { data } = await TMDB.get("/users/userInfo", param);
        console.log(data);
        return data;
    }
    catch (e) {
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
//# sourceMappingURL=auth.js.map