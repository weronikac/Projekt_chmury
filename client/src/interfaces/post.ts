export interface PostI {
  user?: {
    _id?: string;
    name: string;
    avatar: string;
  };
  _id?: string;
  title: string;
  content: string;
  date?: string;
  number_of_likes?: number;
  mylike?: boolean;
  category?: string;
  comments?: [
    {
      _id?: string;
      name: string;
      avatar: string;
      content: string;
      date?: string;
    }
  ];
}

export interface CreatePostI {
  title: string;
  content: string;
}

export interface AddCommentI {
  content: string;
}

export interface CommentI {
  user: {
    _id?: string;
    name: string;
    avatar: string;
  };
  content: string;
  date?: string;
}
