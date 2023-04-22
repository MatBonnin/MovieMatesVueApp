import {
  createMovielistmovie,
  getAllMovielistmovies,
  getMovielistmovieById,
  updateMovielistmovie,
  deleteMovielistmovie,
  addToLikePlaylist,
  removeFromLikePlaylist,
  findAllByListId,
} from "@/api/app/movieListMovie";

interface Movielistmovie {
  [key: string]: any;
}

export const namespaced = true;
export const state = {
  movielistmovies: [] as Movielistmovie[],
  selectedMovielistmovie: {} as Movielistmovie,
};

export const mutations = {
  setMovielistmovies(state: any, data: any) {
    state.movielistmovies = data;
  },
  setSelectedMovielistmovie(state: any, data: any) {
    state.selectedMovielistmovie = data;
  },
  addMovielistmovie(state: any, data: any) {
    state.movielistmovies.push(data);
  },
  updateMovielistmovie(state: any, data: any) {
    const index = state.movielistmovies.findIndex(
      (movielistmovie: Movielistmovie) => movielistmovie.id === data.id
    );
    if (index !== -1) {
      state.movielistmovies.splice(index, 1, data);
    }
  },
  removeMovielistmovie(state: any, id: number) {
    state.movielistmovies = state.movielistmovies.filter(
      (movielistmovie: Movielistmovie) => movielistmovie.id !== id
    );
  },
};

export const actions = {
  async fetchCreateMovielistmovie({ commit }: any, movielistmovieData: any) {
    const data = await createMovielistmovie(movielistmovieData);
    commit("addMovielistmovie", data);
  },
  async fetchAddToLikePlaylist({ commit }: any, movielistmovieData: any) {
    await addToLikePlaylist(movielistmovieData);
  },
  async fetchRemoveFromLikePlaylist({ commit }: any, movielistmovieData: any) {
    await removeFromLikePlaylist(movielistmovieData);
  },
  async fetchGetAllMovielistmovies({ commit }: any) {
    const data = await getAllMovielistmovies();
    commit("setMovielistmovies", data);
  },
  async fetchGetMovielistmovieById({ commit }: any, id: number) {
    const data = await getMovielistmovieById(id);
    commit("setSelectedMovielistmovie", data);
  },
  async fetchFindAllByListId({ commit }: any, idListMovie: number) {
    const data = await findAllByListId(idListMovie);
    commit("setMovielistmovies", data);
  },
  async fetchUpdateMovielistmovie(
    { commit }: any,
    { id, movielistmovieData }: any
  ) {
    const data = await updateMovielistmovie(id, movielistmovieData);
    commit("updateMovielistmovie", data);
  },
  async fetchDeleteMovielistmovie({ commit }: any, id: number) {
    await deleteMovielistmovie(id);
    commit("removeMovielistmovie", id);
  },
};
