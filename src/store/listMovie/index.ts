import {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
} from "@/api/app/listMovie";

interface List {
  [key: string]: any;
}

export const namespaced = true;
export const state = {
  lists: [] as List[],
  selectedList: {} as List,
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
    const index = state.lists.findIndex((list: List) => list.id === data.id);
    if (index !== -1) {
      state.lists.splice(index, 1, data);
    }
  },
  removeList(state: any, id: number) {
    state.lists = state.lists.filter((list: List) => list.id !== id);
  },
};

export const actions = {
  async fetchCreateList({ commit }: any, listData: any) {
    const data = await createList(listData);
    commit("addList", data);
  },
  async fetchGetAllLists({ commit }: any) {
    const data = await getAllLists();
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
};
