export interface Quote {
  id?: string;
  category?: string;
  labels?: string;
  text: string;
  author: {
    username: string;
    id: string;
  };
  pubDate?: any;
  createdDate: any;
  published: boolean;
  likes?: string[];
  dislikes?: string[];
}
