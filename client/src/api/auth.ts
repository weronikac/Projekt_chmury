import { axiosInstance as axios } from '../api';
import { AxiosResponse } from 'axios';
import {
  ForgotI,
  LoginRequestI,
  LoginResponseI,
  RegisterRequestI,
  RegisterResponseI,
  ResetI,
  ChangeI,
  UserI,
} from '../interfaces';
import { axiosUnauthorizedConfig, axiosAuthorizedConfig } from '../api';

export const login = (data: LoginRequestI) => {
  const response: any = axios.post('/auth', data, axiosUnauthorizedConfig);
  console.log(response);
  return response;
};

// export const logout = (data: LogoutRequestI, idToken: string) => {
//   const response: Promise<AxiosResponse> = axios.post(
//     '/accounts/signout/',
//     data,
//     axiosAuthorizedConfig(idToken) || axiosUnauthorizedConfig,
//   );
//   return response;
// };

export const register = (data: RegisterRequestI) => {
  const response: Promise<AxiosResponse<RegisterResponseI>> = axios.post(
    '/users',
    data,
    axiosUnauthorizedConfig
  );
  return response;
};

export const updateProfile = (data: UserI) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: Promise<AxiosResponse<UserI>> = axios.post(
    '/users/update',
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

export const getMyProfile = () => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: Promise<AxiosResponse<UserI>> = axios.get('/auth/me', {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token!,
    },
  });
  return response;
};

export const getProfile = (name: string) => {
  const response: Promise<AxiosResponse<UserI>> = axios.get('/auth/' + name, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const block = (id?: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  console.log('/users/block/' + id);
  const response: any = axios.get('/users/block/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const unblock = (id?: string) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  console.log(token);
  const response: any = axios.get('/users/unblock/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const sendMail = (email: ForgotI) => {
  const response: any = axios.post('/auth/send_reset_mail/', email, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const resetPass = (pass: ResetI) => {
  const token = localStorage.getItem('reset')!.replace(/['"]+/g, '');
  const response: any = axios.post('/auth/reset-password/', pass, {
    headers: {
      'Content-Type': 'application/json',
      reset: token!,
    },
  });
  return response;
};

export const changePass = (pass: ChangeI) => {
  const token = localStorage.getItem('token')!.replace(/['"]+/g, '');
  const response: any = axios.post('/auth/change-password/', pass, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token!,
    },
  });
  return response;
};

// export const forgotPassword = (data: { username: string; email: string }) => {
//   const response: Promise<AxiosResponse<{ message: string }>> = axios.post(
//     `/accounts/forgot_password`,
//     data,
//     axiosUnauthorizedConfig,
//   );
//   return response;
// };
