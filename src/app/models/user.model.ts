export interface User {
  id?: string;
  email: string;
  username: string;
  isPremium: boolean;
}

export interface Tattoo {
  id?: string;
  imageUrl: string;
  title: string;
  creator: string;
  likes: number;
  createdAt: Date;
}