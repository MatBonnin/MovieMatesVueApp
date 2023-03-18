import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { pragma: "no-cache" },
});

function getToken() {
  // Remplacez cette ligne par le code pour obtenir le token JWT stocké localement
  return localStorage.getItem("jwt-session");
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
    if (response.status === 201 && response.data.accessToken) {
      // Gérer la connexion et la redirection vers la page d'accueil ici
      localStorage.setItem("jwt-session", response.data.accessToken);
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Gérer la déconnexion et la redirection vers la page de connexion ici
    }
    return Promise.reject(error);
  }
);

export default instance;
