export interface User {
  username: string;
  displayname: string;
  email: string;
  id: string;
  token?: string;
  mode?: boolean;
  profileImg?: string;
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
}
