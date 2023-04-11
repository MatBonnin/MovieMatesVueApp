import instance from "@/utils/axiosConfig";

export async function getMovieByIMDB(param: string): Promise<any> {
  try {
    const { data } = await instance.get<object>("/movie/" + param);
    console.log(data);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
  }
}

export async function insertMovie(param: object): Promise<any> {
  try {
    const { data } = await instance.post<object>("/movie", param);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
  }
}

export async function isLiked(param: object): Promise<any> {
  try {
    const { data } = await instance.post<object>("/movie/isLiked", param);
    console.log(data);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
  }
}
