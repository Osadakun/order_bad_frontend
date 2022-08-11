export type Post = {
  id: number;
  name: string;
  enemy_name: string;
  content: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};