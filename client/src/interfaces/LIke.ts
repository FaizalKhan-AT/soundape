import { User } from "./User";

export interface Like {
  _id: string;
  postId: string;
  profile: User;
}
