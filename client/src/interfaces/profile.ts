export interface ProfileI {
  user: {
    _id?: string;
    name?: string;
    avatar: string;
  };
  bio: string;
  age: number;
  location: string;
  avatar: string;
}

export interface UserI {
  name?: string;
  email?: string;
  password?: string;
  _id?: string;
  date?: any;
  bio?: string;
  avatar?: string;
}

export interface AddMessageI {
  content: string;
}

export interface MessageI {
  user: {
    _id?: string;
    name: string;
    avatar: string;
  };
  content: string;
  date?: string;
}
