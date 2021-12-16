import React from 'react';
import { PostList } from '../components';
import { LayoutList } from '../components';

export const MainPage: React.FC = () => {
  return (
    <>
      <LayoutList>
        <PostList />
      </LayoutList>
    </>
  );
};
