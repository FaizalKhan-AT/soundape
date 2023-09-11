import axios from "../config";

// @followUser id = following user id, profileId = currently logged in user id

const followUser = async (id: string, profileId: string) => {
  try {
    const { data } = await axios.post(`/user/follow/${id}`, { profileId });
    return data;
  } catch (err: any) {
    return { status: "error", error: err.response.data.error };
  }
};
export default followUser;
