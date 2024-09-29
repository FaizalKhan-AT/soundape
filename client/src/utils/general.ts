import axios from "../config";
import { User } from "../interfaces/User";

export const getImageBaseURL = (): string =>
  import.meta.env.VITE_IMAGE_BASE_URL;

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
export const deleteUser = async (id: string) => {
  try {
    let { data } = await axios.delete(`/admin/delete-user/${id}`);
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export const verifyUser = async (id: string) => {
  try {
    let { data } = await axios.patch(`/admin/verify/${id}`);
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export const refuteUser = async (id: string) => {
  try {
    let { data } = await axios.patch(`/admin/refute/${id}`);
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export const reportPostAdmin = async (id: string) => {
  try {
    let { data } = await axios.patch(`/admin/report-post/${id}`);
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export const revokeReportedPost = async (id: string) => {
  try {
    let { data } = await axios.patch(`/admin/revoke-post/${id}`);
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export const saveToLS = (data: User, n: string = "") => {
  localStorage.setItem(`${n}token`, data.token as string);
  localStorage.setItem(`${n}user`, JSON.stringify(data));
};
