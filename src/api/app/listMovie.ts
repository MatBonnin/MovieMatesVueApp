import instance from "@/utils/axiosConfig";

// ...

export async function createList(name: string, file: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    const { data } = await instance.post<object>("/list", formData);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getAllLists(idUser: number): Promise<any> {
  try {
    const { data } = await instance.get<object>(
      `/list/getAllUserList/${idUser}`
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getListById(id: number): Promise<any> {
  try {
    const { data } = await instance.get<object>(`/list/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function updateList(id: number, listData: object): Promise<any> {
  try {
    const { data } = await instance.put<object>(`/list/${id}`, listData);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function deleteList(id: number): Promise<any> {
  try {
    const { data } = await instance.delete<object>(`/list/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function updateListImage(
  file: File,
  listId: number
): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", listId.toString());

    const { data } = await instance.post<object>(
      "/list/updateListImage",
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
