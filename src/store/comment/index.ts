import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentsByMovieId,
} from "@/api/app/comment";

interface Comment {
  [key: string]: any;
}

export const namespaced = true;

export const state = {
  comments: [] as Comment[],
  selectedComment: {} as Comment,
};

export const mutations = {
  setComments(state: any, data: any) {
    state.comments = data;
  },
  setSelectedComment(state: any, data: any) {
    state.selectedComment = data;
  },
  addComment(state: any, data: any) {
    state.comments.push(data);
  },
  removeComment(state: any, id: string) {
    state.comments = state.comments.filter(
      (comment: Comment) => comment.id !== id
    );
  },
};

export const actions = {
  async fetchCreateComment({ commit }: any, commentData: any) {
    const data = await createComment(commentData);
    commit("addComment", data);
  },
  async fetchGetAllComments({ commit }: any) {
    const data = await getAllComments();
    commit("setComments", data);
  },
  async fetchGetCommentsByMovieId({ commit }: any, idImdbMovie: string) {
    const data = await getCommentsByMovieId(idImdbMovie);
    commit("setComments", data);
  },
  async fetchDeleteComment({ commit }: any, id: string) {
    await deleteComment(id);
    commit("removeComment", id);
  },
};
