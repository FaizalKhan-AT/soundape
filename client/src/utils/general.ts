import axios from "../config";
import { User } from "../interfaces/User";

export const getImageBaseURL = (): string => {
  return import.meta.env.VITE_IMAGE_BASE_URL;
};
export const reportPost = async (id: string) => {
  try {
    let { data } = await axios.post(`/posts/report/${id}`);
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export const deletePost = async (id: string, uid: string) => {
  try {
    let { data } = await axios.delete(`/posts`, {
      headers: {
        "post-id": id,
        "user-id": uid,
      },
    });
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export const saveToLS = (data: User, n: string = "") => {
  localStorage.setItem(`${n}token`, data.token as string);
  localStorage.setItem(`${n}user`, JSON.stringify(data));
};
