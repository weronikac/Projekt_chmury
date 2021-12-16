import React, { useEffect, useState } from 'react';
import { PostI } from '../interfaces';
import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import { getPosts, getPostsByLikes, getPostsByComments } from '../api';
import { Post } from './Post';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
interface Props {}

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

export const PostList = (props: Props) => {
  const styles = useStyles();
  const [posts, setPosts] = useState<PostI[]>([]);

  const [sort, setSort] = useState<Number>(0);

  useEffect(() => {
    const getPostsFnc = async () => {
      const { data } = await getPosts();
      setPosts(data);
      setTotalPages(Math.ceil(data.length / perPage));
    };

    try {
      getPostsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać postów!');
    }
  }, []);

  const handleChange = (event: any) => {
    setSort(event.target.value);
    if (event.target.value == 0) {
      const getPostsFnc = async () => {
        const { data } = await getPosts();
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
        const { data } = await getPostsByLikes();
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
        const { data } = await getPostsByComments();
        setPosts(data);
      };

      try {
        getPostsFnc();
      } catch (error) {
        toast.error('Nie udało się pobrać postów!');
      }
    }
  };

  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(10);

  const handlePrevPage = (prevPage: number) => {
    setPage((prevPage) => prevPage - 1);
    setOffset((off) => off - perPage + 1);
    console.log(offset);
  };

  const handleNextPage = (nextPage: number) => {
    setPage((nextPage) => nextPage + 1);
    setOffset((off) => off + perPage - 1);
    console.log(offset);
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
        </Select>{' '}
        {posts.slice(page + offset - 1, page * perPage).map((post) => (
          <Post post={post} />
        ))}
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </Box>
    </>
  );
};
