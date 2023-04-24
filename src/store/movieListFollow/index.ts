import {
  createListMovieFollow,
  deleteListMovieFollow,
  getAllListMovieFollows,
  getListMovieFollowById,
  updateListMovieFollow,
} from "@/api/app/listMovieFollow";

interface ListMovieFollow {
  [key: string]: any;
}

export const namespaced = true;

export const state = {
  listMovieFollows: [] as ListMovieFollow[],
  selectedListMovieFollow: {} as ListMovieFollow,
};

export const mutations = {
  setListMovieFollows(state: any, data: any) {
    state.listMovieFollows = data;
  },
  setSelectedListMovieFollow(state: any, data: any) {
    state.selectedListMovieFollow = data;
  },
  addListMovieFollow(state: any, data: any) {
    state.listMovieFollows.push(data);
  },
  updateListMovieFollow(state: any, data: any) {
    const index = state.listMovieFollows.findIndex(
      (lmf: ListMovieFollow) => lmf.id === data.id
    );
    if (index !== -1) {
      state.listMovieFollows.splice(index, 1, data);
    }
  },
  removeListMovieFollow(state: any, id: number) {
    state.listMovieFollows = state.listMovieFollows.filter(
      (lmf: ListMovieFollow) => lmf.id !== id
    );
  },
};

export const actions = {
  async fetchCreateListMovieFollow(
    { commit }: any,
    { idPlaylist, idFollower }: { idPlaylist: number; idFollower: number }
  ) {
    const data = await createListMovieFollow(idPlaylist, idFollower);
    commit("addListMovieFollow", data);
  },
  async fetchGetAllListMovieFollows({ commit }: any) {
    const data = await getAllListMovieFollows();
    commit("setListMovieFollows", data);
  },
  async fetchGetListMovieFollowById({ commit }: any, id: number) {
    const data = await getListMovieFollowById(id);
    commit("setSelectedListMovieFollow", data);
  },
  async fetchUpdateListMovieFollow(
    { commit }: any,
    {
      id,
      idPlaylist,
      idFollower,
    }: { id: number; idPlaylist: number; idFollower: number }
  ) {
    const data = await updateListMovieFollow(id, idPlaylist, idFollower);
    commit("updateListMovieFollow", data);
  },
  async fetchDeleteListMovieFollow(
    { commit }: any,
    { idPlaylist }: { idPlaylist: number }
  ) {
    await deleteListMovieFollow(idPlaylist);
  },
};
