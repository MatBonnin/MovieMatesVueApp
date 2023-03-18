import { AxiosInstance } from "axios";

function getToken() {
  // Remplacez cette ligne par le code pour obtenir le token JWT stocké localement
  return localStorage.getItem("access_token");
}

export function attachTokenInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use((config: any) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
}
