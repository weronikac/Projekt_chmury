import { axiosInstance as axios } from '../api';
import { AxiosResponse } from 'axios';
import {
  PostI,
  AddCommentI,
  AddMessageI,
  CreatePostI,
  UserI,
} from '../interfaces';
import { axiosUnauthorizedConfig, axiosAuthorizedConfig } from '../api';

export const addPost = (data: CreatePostI) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: Promise<AxiosResponse<PostI>> = axios.post('/post', data, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token!,
    },
  });
  return response;
};

export const updatePost = (data: PostI) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: Promise<AxiosResponse<PostI>> = axios.post(
    '/post/update/' + data._id,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token!,
      },
    }
  );
  return response;
};

export const addComment = (id?: string, data?: AddCommentI) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: Promise<AxiosResponse<PostI>> = axios.post(
    '/post/' + id,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token!,
      },
    }
  );
  return response;
};

export const addMessage = (data?: AddMessageI) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: Promise<AxiosResponse<UserI>> = axios.post(
    '/users/sendMessage',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token!,
      },
    }
  );
  return response;
};

export const likePost = (id?: string, sign?: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  console.log(sign);
  const response: any = axios.get('/post/likes/' + id, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token!,
    },
  });

  return response;
};

export const dislikePost = (id?: string, sign?: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  console.log(sign);
  const response: any = axios.get('/post/dislikes/' + id, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token!,
    },
  });

  return response;
};

export const getPost = (id: string) => {
  const response: Promise<AxiosResponse<PostI>> = axios.get('/post/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getAuthPost = (id: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: Promise<AxiosResponse<PostI>> = axios.get(
    '/post/auth/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token!,
      },
    }
  );
  return response;
};

export const deletePost = (id?: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: any = axios.delete('/post/' + id, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token!,
    },
  });
  return response;
};

export const deleteComment = (id?: string, idCom?: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  console.log('vrebv');
  const response: any = axios.delete(
    '/post/deleteComment/' + id + '/' + idCom,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token!,
      },
    }
  );
  return response;
};

export const deleteMess = (id?: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: any = axios.delete('/users/deleteMessage/' + id, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token!,
    },
  });
  return response;
};

export const getPosts = () => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post',
    axiosUnauthorizedConfig
  );
  return response;
};

export const getPostsByLikes = () => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/by_likes',
    axiosUnauthorizedConfig
  );
  return response;
};

export const getPostsByComments = () => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/by_comments',
    axiosUnauthorizedConfig
  );
  return response;
};

export const getPostsByCategoryAndDate = (category: string) => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/category/date/' + category,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

export const getPostsByCategoryAndLikes = (category: string) => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/category/likes/' + category,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

export const getPostsByCategoryAndComments = (category: string) => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/category/comments/' + category,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

export const getPostsByTagAndDate = (tag: string) => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/tag/date/' + tag,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

export const getPostsByTagAndLikes = (tag: string) => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/tag/likes/' + tag,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

export const getPostsByTagAndComments = (tag: string) => {
  const response: Promise<AxiosResponse<PostI[]>> = axios.get(
    '/post/tag/comments/' + tag,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};
