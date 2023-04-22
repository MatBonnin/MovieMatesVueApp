import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BACK,
  headers: { pragma: "no-cache" },
});

function getToken() {
  // Remplacez cette ligne par le code pour obtenir le token JWT stocké localement
  return localStorage.getItem("jwt-session");
}
function getRefreshToken() {
  // Remplacez cette ligne par le code pour obtenir le token de rafraîchissement stocké localement
  return localStorage.getItem("refresh-token");
}

function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("jwt-session", accessToken);
  localStorage.setItem("refresh-token", refreshToken);
}

async function refreshToken() {
  try {
    const response = await instance.post("/auth/refresh", {
      refreshToken: getRefreshToken(),
    });

    if (response.status === 201 && response.data.access_token) {
      localStorage.setItem("jwt-session", response.data.access_token);
      return response.data.access_token;
    }
  } catch (error) {
    console.error("Error refreshing access token", error);
    return null;
  }
}

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 201 && response.data.tokens) {
      // Gérer la connexion et la redirection vers la page d'accueil ici
      setTokens(
        response.data.tokens.access_token,
        response.data.tokens.refresh_token
      );
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._retry
      ) {
        error.config._retry = true;
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance.request(error.config);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
