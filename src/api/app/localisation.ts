import axios from "axios";
import instance from "@/utils/axiosConfig";

export async function createLocalisation(localisationData: any) {
  try {
    const { data } = await instance.post("/localisation", localisationData);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getAllLocalisations() {
  try {
    const { data } = await instance.get("/localisation");
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function findNearbyUsers(maxDistance: number) {
  try {
    const { data } = await instance.get("/localisation/nearbyFriends", {
      params: { maxDistance },
    });
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getLocalisationById(id: number) {
  try {
    const { data } = await instance.get(`/localisation/${id}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function updateLocalisation(id: number, localisationData: any) {
  try {
    const { data } = await instance.put(
      `/localisation/${id}`,
      localisationData
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getCityFromCoordinates(
  latitude: number,
  longitude: number
) {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
          addressdetails: 1,
        },
      }
    );

    if (response.data && response.data.address) {
      return (
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village
      );
    } else {
      console.error("Error: No address information found");
      return null;
    }
  } catch (error: any) {
    console.error("Error: " + error.message);
    return null;
  }
}
