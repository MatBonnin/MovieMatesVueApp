import instance from "@/utils/axiosConfig";
// ...

export async function createList(listData: object): Promise<any> {
  try {
    const { data } = await instance.post<object>("/list", listData);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getAllLists(): Promise<any> {
  try {
    const { data } = await instance.get<object>("/list");
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getListById(id: number): Promise<any> {
  try {
    const { data } = await instance.get<object>(`/list/${id}`);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function updateList(id: number, listData: object): Promise<any> {
  try {
    const { data } = await instance.put<object>(`/list/${id}`, listData);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function deleteList(id: number): Promise<any> {
  try {
    const { data } = await instance.delete<object>(`/list/${id}`);
    return data;
  } catch (e: any) {
    console.log(e.response.status);
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}
