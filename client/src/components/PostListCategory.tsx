import React, { useEffect, useState } from 'react';
import { PostI } from '../interfaces';
import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import {
  getPostsByCategoryAndDate,
  getPostsByCategoryAndLikes,
  getPostsByCategoryAndComments,
} from '../api';
import { Post } from './Post';
import { toast } from 'react-toastify';

interface Props {
  category: string;
}

const useStyles = makeStyles((theme) => ({
  teamList: {
    display: 'flex',
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',
  },
  select: {
    fontSize: 20,
    fontWeight: 400,
  },
}));

export const PostListCategory: React.FC<Props> = ({ category }) => {
  const styles = useStyles();
  const [posts, setPosts] = useState<PostI[]>([]);

  const [sort, setSort] = useState<Number>(0);

  useEffect(() => {
    const getPostsFnc = async () => {
      const { data } = await getPostsByCategoryAndDate(category);
      setPosts(data);
    };

    try {
      getPostsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać postów!');
    }
    console.log(sort);
  }, []);

  const handleChange = (event: any) => {
    setSort(event.target.value);
    if (event.target.value == 0) {
      const getPostsFnc = async () => {
        const { data } = await getPostsByCategoryAndDate(category);
        setPosts(data);
      };

      try {
        getPostsFnc();
      } catch (error) {
        toast.error('Nie udało się pobrać postów!');
      }
    }
    if (event.target.value == 1) {
      const getPostsFnc = async () => {
        const { data } = await getPostsByCategoryAndLikes(category);
        setPosts(data);
      };

      try {
        getPostsFnc();
      } catch (error) {
        toast.error('Nie udało się pobrać postów!');
      }
    }
    if (event.target.value == 2) {
      const getPostsFnc = async () => {
        const { data } = await getPostsByCategoryAndComments(category);
        setPosts(data);
      };

      try {
        getPostsFnc();
      } catch (error) {
        toast.error('Nie udało się pobrać postów!');
      }
    }
  };

  return (
    <>
      <Box className={styles.teamList}>
        <Select
          className={styles.select}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value={0}>Sortuj według daty</MenuItem>
          <MenuItem value={1}>Sortuj według oceny</MenuItem>
          <MenuItem value={2}>Sortuj według komentarzy</MenuItem>
        </Select>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </Box>
    </>
  );
};
