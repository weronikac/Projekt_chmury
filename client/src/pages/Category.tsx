import React from 'react';
import { PostListCategory } from '../components';
import { LayoutList } from '../components';
import { useParams } from 'react-router';

interface Params {
  category: string;
}

export const Category: React.FC = () => {
  const params: Params = useParams();

  return (
    <LayoutList>
      <PostListCategory category={params.category} />
    </LayoutList>
  );
};
