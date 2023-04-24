import instance from "@/utils/axiosConfig";

export async function createListMovieFollow(
  idPlaylist: number,
  idFollower: number
) {
  try {
    const { data } = await instance.post("/listmoviefollow", {
      idPlaylist,
      idFollower,
    });
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getAllListMovieFollows() {
  try {
    const { data } = await instance.get("/listmoviefollow");
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getListMovieFollowById(id: number) {
  try {
    const { data } = await instance.get(`/listmoviefollow/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function updateListMovieFollow(
  id: number,
  idPlaylist: number,
  idFollower: number
) {
  try {
    const { data } = await instance.put(`/listmoviefollow/${id}`, {
      idPlaylist,
      idFollower,
    });
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function deleteListMovieFollow(idPlaylist: number) {
  try {
    const { data } = await instance.delete(`/listmoviefollow/${idPlaylist}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}
