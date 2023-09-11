import { User } from "./User";

export interface Comment {
  _id?: string;
  comment: string;
  profile?: User;
  postId: string;
}
