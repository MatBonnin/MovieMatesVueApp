import instance from "@/utils/axiosConfig";

export async function createComment(commentData: any): Promise<any> {
  try {
    const { data } = await instance.post("/comment", commentData);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getAllComments(): Promise<any> {
  try {
    const { data } = await instance.get("/comment");
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getCommentsByMovieId(idImdbMovie: string): Promise<any> {
  try {
    const { data } = await instance.get(`/comment/movie/${idImdbMovie}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function deleteComment(id: string): Promise<any> {
  try {
    const { data } = await instance.delete(`/comment/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}
