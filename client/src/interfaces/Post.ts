export interface Post {
  _id: string;
  userId: string;
  audioUrl: string;
  format: string;
  likes: number;
  title: string;
  reported: boolean;
  liked?:boolean;
}
