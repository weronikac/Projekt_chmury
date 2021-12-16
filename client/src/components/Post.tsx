import React, { useEffect, useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { PostI, UserI } from '../interfaces';
import { colors } from '../styles';
import ReadMore from './ReadMore';
import { useHistory } from 'react-router';
import { getMyProfile } from '../api';

interface Props {
  post: PostI;
}

const useStyles = makeStyles((theme) => ({
  basicInfoContainer: {
    padding: '30px 30px 30px 30px',
    backgroundColor: colors.WHITE,
    borderBottom: `1px solid ${colors.RED}`,
    borderRadius: 5,
    marginTop: 5,
    width: '100%',
    display: 'flex',
  },
  avatarContainer: {
    paddingRight: 20,
  },
  photo: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
  },
  contentContainer2: {
    width: '100%',
    display: 'flex',
    fontSize: 16,
  },
  userName: {
    fontWeight: 100,
    fontSize: 15,
    lineHeight: '22px',
    margin: 0,
  },
  date: {
    position: 'absolute',
    right: 0,
    color: colors.BLUE,
    fontWeight: 100,
    fontSize: 14,
    lineHeight: '22px',
    margin: 0,
  },
  postTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '125%',
    margin: 0,
  },
  infoBox: {
    display: 'flex',
    width: '70%',
    minWidth: '230px',
    justifyContent: 'space-between',
  },

  minorInfo: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  likes: {
    fontSize: 15,
    margin: '0px 25px 0px 0px',
  },
  button: {
    position: 'absolute',
    fontSize: 12,
    bottom: -20,
    right: 0,
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: '180px',
    height: '30px',

    '&:hover': {
      backgroundColor: colors.BLUE,
    },
  },
}));

export const Post: React.FC<Props> = ({ post }) => {
  const styles = useStyles();
  const history = useHistory();
  const [profile, setProfile] = useState<UserI>();
  const token = localStorage.getItem('token');

  const postSelectedHandler = (id?: string) => {
    if (token) history.push('/postauthview/' + id, profile);
    else history.push('/postview/' + id, profile);
  };

  useEffect(() => {
    const getProfileFnc = async () => {
      if (token) {
        const { data } = await getMyProfile();
        setProfile(data);
      }
    };

    getProfileFnc();
  }, []);

  return (
    <>
      <Box className={styles.basicInfoContainer}>
        <Box className={styles.avatarContainer}>
          <img
            className={styles.photo}
            height='100'
            width='100'
            src={post.user!.avatar!}
            alt='avatar'
          />
        </Box>
        <Box className={styles.contentContainer}>
          <Box className={styles.contentContainer2}>
            <p className={styles.userName}>{post.user!.name}</p>
            <p className={styles.date}>{post.category}</p>
          </Box>
          <h3 className={styles.postTitle}>{post.title}</h3>
          <Box className={styles.infoBox}>
            <ReadMore>
              <p className={styles.minorInfo}>{post.content}</p>
            </ReadMore>
          </Box>
          <Box className={styles.contentContainer2}>
            <p className={styles.likes}>Ocena: {post.number_of_likes}</p>
            <p className={styles.likes}>Komentarze: {post.comments?.length}</p>
          </Box>
          <Button
            className={styles.button}
            onClick={() => postSelectedHandler(post._id)}
          >
            Przejdź do posta
          </Button>
        </Box>
      </Box>
    </>
  );
};
