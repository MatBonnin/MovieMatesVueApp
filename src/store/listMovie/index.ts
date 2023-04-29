import {
  createList,
  deleteList,
  getAllLists,
  getListById,
  updateList,
  updateListImage,
} from "@/api/app/listMovie";

export const namespaced = true;
export const state = {
  lists: [],
  selectedList: {},
};

export const mutations = {
  setLists(state: any, data: any) {
    state.lists = data;
  },
  setSelectedList(state: any, data: any) {
    state.selectedList = data;
  },
  addList(state: any, data: any) {
    state.lists.push(data);
  },
  updateList(state: any, data: any) {
    const index = state.lists.findIndex((list: any) => list.id === data.id);
    if (index !== -1) {
      state.lists.splice(index, 1, data);
    }
  },
  removeList(state: any, id: number) {
    state.lists = state.lists.filter((list: any) => list.id !== id);
  },
};

export const actions = {
  async fetchCreateList({ commit }: any, data: any) {
    const result = await createList(data.name, data.file);
    commit("addList", result);
  },
  async fetchGetAllLists({ commit }: any, idUser: number) {
    const data = await getAllLists(idUser);
    commit("setLists", data);
  },
  async fetchGetListById({ commit }: any, id: number) {
    const data = await getListById(id);
    commit("setSelectedList", data);
  },
  async fetchUpdateList({ commit }: any, { id, listData }: any) {
    const data = await updateList(id, listData);
    commit("updateList", data);
  },
  async fetchDeleteList({ commit }: any, id: number) {
    await deleteList(id);
    commit("removeList", id);
  },
  async fetchUpdateListImage({ commit }: any, data: any) {
    try {
      const response = await updateListImage(data.file, data.listId);
      console.log(response);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'image de la playlist:",
        error
      );
    }
  },
};
