import instance from "@/utils/axiosConfig";

export async function createMovielistmovie(
  movielistmovieData: object
): Promise<any> {
  try {
    const { data } = await instance.post<object>(
      "/movielistmovie",
      movielistmovieData
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getAllMovielistmovies(): Promise<any> {
  try {
    const { data } = await instance.get<object>("/movielistmovie");
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getMovielistmovieById(id: number): Promise<any> {
  try {
    const { data } = await instance.get<object>(`/movielistmovie/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function updateMovielistmovie(
  id: number,
  movielistmovieData: object
): Promise<any> {
  try {
    const { data } = await instance.put<object>(
      `/movielistmovie/${id}`,
      movielistmovieData
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function deleteMovielistmovie(id: number): Promise<any> {
  try {
    const { data } = await instance.delete<object>(`/movielistmovie/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function addToLikePlaylist(
  movielistmovieData: object
): Promise<any> {
  try {
    const { data } = await instance.post<object>(
      "/movielistmovie/addToLikePlaylist",
      movielistmovieData
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}
export async function removeFromLikePlaylist(
  movielistmovieData: object
): Promise<any> {
  try {
    const { data } = await instance.delete<object>(
      "/movielistmovie/removeFromLikePlaylist",
      {
        data: movielistmovieData,
      }
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function findAllByListId(idListMovie: number): Promise<any> {
  try {
    const { data } = await instance.get(
      `/movielistmovie/findAllByListId/${idListMovie}`
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}
