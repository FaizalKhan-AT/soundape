export interface User {
  username: string;
  displayname: string;
  email: string;
  _id: string;
  token?: string;
  mode?: boolean;
  profileImg?: string;
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
  profileDesc?: string;
  verified?: boolean;
}
