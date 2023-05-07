import {
  createLocalisation,
  findNearbyUsers,
  getAllLocalisations,
  getCityFromCoordinates,
  getLocalisationById,
  updateLocalisation,
} from "@/api/app/localisation";

interface Localisation {
  [key: string]: any;
}

export const namespaced = true;
export const state = {
  localisations: [] as Localisation[],
  selectedLocalisation: {} as Localisation,
  nearbyUsers: [],
  city: "",
};

export const mutations = {
  setLocalisations(state: any, data: any) {
    state.localisations = data;
  },
  setSelectedLocalisation(state: any, data: any) {
    state.selectedLocalisation = data;
  },
  addLocalisation(state: any, data: any) {
    state.localisations.push(data);
  },
  updateLocalisation(state: any, data: any) {
    const index = state.localisations.findIndex(
      (localisation: Localisation) => localisation.id === data.id
    );
    if (index !== -1) {
      state.localisations.splice(index, 1, data);
    }
  },
  setNearbyUsers(state: any, data: any) {
    state.nearbyUsers = data;
  },
  setCity(state: any, city: string) {
    state.city = city;
  },
};

export const actions = {
  async fetchCreateLocalisation({ commit }: any, localisationData: any) {
    const data = await createLocalisation(localisationData);
    commit("addLocalisation", data);
  },
  async fetchGetAllLocalisations({ commit }: any) {
    const data = await getAllLocalisations();
    commit("setLocalisations", data);
  },
  async fetchGetLocalisationById({ commit }: any, id: number) {
    const data = await getLocalisationById(id);
    commit("setSelectedLocalisation", data);
  },
  async fetchUpdateLocalisation(
    { commit }: any,
    { id, localisationData }: any
  ) {
    const data = await updateLocalisation(id, localisationData);
    commit("updateLocalisation", data);
  },
  async fetchFindNearbyUsers({ commit }: any, maxDistance: number) {
    const data = await findNearbyUsers(maxDistance);
    commit("setNearbyUsers", data);
  },
  async fetchCityFromCoordinates({ commit }: any, userId: any) {
    const data = await getLocalisationById(userId);
    console.log(data);
    const city = await getCityFromCoordinates(
      data[0].latitude,
      data[0].longitude
    );
    commit("setCity", city);
  },
};
