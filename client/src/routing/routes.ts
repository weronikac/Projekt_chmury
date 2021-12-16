import { RouteProps } from 'react-router-dom';
import {
  Login,
  Register,
  MyProfile,
  Ask,
  PostView,
  PostViewAuth,
  Category,
  Profile,
} from '../pages';
import { paths } from './paths';

export const routes: RouteProps[] = [
  {
    path: paths.LOGIN,
    component: Login,
  },
  {
    path: paths.REGISTER,
    component: Register,
  },
  {
    path: paths.MYPROFILE,
    component: MyProfile,
  },
  {
    path: paths.ASK,
    component: Ask,
  },
  {
    path: paths.POSTVIEW,
    component: PostView,
  },
  {
    path: paths.POSTAUTHVIEW,
    component: PostViewAuth,
  },
  {
    path: paths.CATEGORY,
    component: Category,
  },
  {
    path: paths.PROFILE,
    component: Profile,
  },
];
