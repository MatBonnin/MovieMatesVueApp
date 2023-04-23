import axios from "axios";
import instance from "@/utils/axiosConfig";

export async function createUser(param: any): Promise<any> {
  try {
    const { data } = await instance.post<object>("/users/create", param);

    return data;
  } catch (e: any) {
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
  }
}

export async function updateProfilePicture(file: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("photo", file);

    const { data } = await instance.post<object>(
      "/users/updateProfilePicture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (e: any) {
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message  };
  }
}

export async function searchUser(partialUsername: string): Promise<any> {
  try {
    const { data } = await instance.get<object>(
      `/users/search/${partialUsername}`
    );
    return data;
  } catch (e: any) {
    // eslint-disable-next-line
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getUserInfo(): Promise<object> {
  try {
    const { data } = await instance.get<object>("/users/getInfoUser");

    return data;
  } catch (e) {
    return { error: e };
  }
}

export async function getInfoProfileUser(idUser: number): Promise<object> {
  try {
    const { data } = await instance.get<object>(
      `/users/getInfoProfileUser/${idUser}`
    );

    return data;
  } catch (e) {
    return { error: e };
  }
}

export async function getProfilePicture(id: number): Promise<any> {
  try {
    const { data } = await instance.get(`/profilePicture/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function updateProfileBackdrop(file: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("backdrop", file);

    const { data } = await instance.post<object>(
      "/users/updateProfileBackdrop",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}
