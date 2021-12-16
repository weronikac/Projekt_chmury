import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { CustomTextField, Layout, Loading } from '../components';
import { NavLink, useLocation } from 'react-router-dom';
import { PostI, AddCommentI, UserI, AddMessageI } from '../interfaces';
import { colors } from '../styles';
import {
  getAuthPost,
  addComment,
  likePost,
  getMyProfile,
  deletePost,
  addMessage,
  dislikePost,
  deleteComment,
} from '../api';
import { toast } from 'react-toastify';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

interface Props {
  info?: PostI;
  edit?: boolean;
}

const useStyles = makeStyles((theme) => ({
  basicInfoContainer: {
    padding: '30px 30px 30px 30px',
    backgroundColor: colors.WHITE,
    borderBottom: `1px solid ${colors.RED}`,
    borderRadius: 5,
    marginTop: 100,
    marginBottom: 100,
    width: '100%',
    display: 'flex',
  },
  comContainer: {
    padding: '20px 10px 10px 10px',
    backgroundColor: colors.WHITE,
    borderBottom: `1px solid ${colors.BLUE}`,
    borderLeft: `1px solid ${colors.BLUE}`,
    borderRadius: 5,
    marginTop: 10,
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
  photocom: {
    width: '45px',
    height: '45px',
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

    position: 'relative',
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
    top: -15,
    fontWeight: 100,
    fontSize: 14,
    lineHeight: '22px',
    margin: 0,
  },
  postTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '125%',
    width: '70%',
    margin: 0,
  },
  infoBox: {
    display: 'flex',
    fontSize: '15px',
    margin: '0px 0px 0px 0px',
  },
  content: {
    fontSize: 14,
    margin: '10px 0px 0px 0px',
  },
  tag: {
    fontSize: 15,
    fontWeight: 300,
    color: colors.INFO_BLUE,
    margin: '0px 0px 0px 10px',
  },
  minorInfo: {
    fontSize: 14,
    display: 'flex',
    flexFlow: 'row',
    margin: '10px 0px 0px 0px',
  },
  category: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: '30%',
    fontWeight: 600,
    color: colors.BLUE,
    // margin: '0px 10px 0px 0px',
  },
  comName: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '22px',
    margin: 0,
  },
  comInfo: {
    fontSize: 15,
    margin: '0px 0px 0px 7px',
  },
  button: {
    left: 30,
    bottom: -35,
    backgroundColor: colors.BLUE,
    color: colors.WHITE,
    width: '120px',
    height: '40px',

    '&:hover': {
      backgroundColor: colors.RED,
    },
  },
  buttonZ: {
    position: 'absolute',
    top: 5,
    right: 0,
    fontSize: '13px',
    margin: 0,
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: '75px',
    height: '25px',

    '&:hover': {
      backgroundColor: colors.BLUE,
    },
  },
  buttonZ3: {
    position: 'absolute',
    top: 5,
    right: 85,
    fontSize: '13px',
    margin: 0,
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: '75px',
    height: '25px',

    '&:hover': {
      backgroundColor: colors.BLUE,
    },
  },
  buttonZ2: {
    position: 'absolute',
    top: -5,
    right: 0,
    lineHeight: '13px',
    margin: 0,
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: '80px',
    height: '25px',

    '&:hover': {
      backgroundColor: colors.BLUE,
    },
  },
  addCommentContainer: {
    marginTop: 20,

    display: 'flex',
  },
  commentsContainer: {
    marginTop: 20,
    fontSize: '20px',
    borderTop: `1px solid ${colors.RED}`,
  },
  thumb: {
    cursor: 'pointer',
    '&:hover': {
      color: 'colors.SECONDARY',
    },
  },
  list: {
    cursor: 'pointer',
  },
}));

interface Params {
  id: string;
}

export const PostViewAuth = (props: Props) => {
  const [post, setPost] = useState<PostI>();
  const styles = useStyles();
  const params: Params = useParams();
  const [content, setContent] = useState<AddCommentI>();
  const token = localStorage.getItem('token');
  const [canUp, setCanUp] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>();

  const [profile, setProfile] = useState<UserI>();

  const [thumbColors, setThumbColors] = useState({
    up: 'black',
  });

  const { state }: any = useLocation();

  useEffect(() => {
    const getPostFnc = async () => {
      const { data } = await getAuthPost(params.id);
      setPost(data);
      var mess =
        'Chcę zgłosić post: https://medical-forum.herokuapp.com/adminpostview/' +
        data?._id;
      setLikes(data.number_of_likes);
      console.log(state);
      if (state?._id)
        if (data.mylike) {
          setThumbColors({ up: colors.RED });
          setCanUp(false);
        }
    };

    const getProfileFnc = async () => {
      if (token) {
        const { data } = await getMyProfile();
        setProfile(data);
      }
    };

    getProfileFnc();
    getPostFnc();
  }, []);

  const newComment = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await addComment(post!._id, content);
      window.location.reload();
      toast.success('Pomyślnie dodano komentarz!');
    } catch (error) {
      toast.error('Pojawił się problem przy dodawaniu komentarza!');
    }
  };

  const ratePost = async () => {
    try {
      if (canUp == true) {
        await likePost(post?._id, 'plus');
        setThumbColors({ up: colors.RED });
        setCanUp(false);
        setLikes(likes! + 1);
        toast.success('Post został oceniony!');
      } else {
        await dislikePost(post?._id, 'minus');
        setThumbColors({ up: colors.BLACK });
        setCanUp(true);
        setLikes(likes! - 1);
        toast.success('Ocena została usunięta!');
      }
    } catch (e) {
      console.log(e);
      toast.error('Nie udało się ocenić posta!');
    }
  };

  const visitProfile = async (name: string) => {
    window.location.assign('/profile/' + name);
  };

  const deletePostByid = async () => {
    try {
      await deletePost(post?._id);
      window.location.assign('/');
      toast.success('Post został usunięty!');
    } catch (e) {
      toast.error('Nie udało się usunąć posta!');
    }
  };

  const deleteCom = async (id?: string) => {
    try {
      await deleteComment(post?._id, id);
      console.log(post?._id, id);
      window.location.reload();
      toast.success('Komentarz został usunięty!');
    } catch (e) {
      toast.error('Nie udało się usunąć komentarza!');
    }
  };

  return (
    <>
      <Layout>
        {!post ? (
          <Loading />
        ) : (
          [
            <Box className={styles.basicInfoContainer}>
              <div
                className={styles.list}
                onClick={() => visitProfile(post.user!.name)}
              >
                <Box className={styles.avatarContainer}>
                  <img
                    className={styles.photo}
                    height='100'
                    width='100'
                    src={post.user!.avatar!}
                    alt='avatar'
                  />
                </Box>
              </div>
              <Box className={styles.contentContainer}>
                <Box className={styles.contentContainer2}>
                  <div
                    className={styles.list}
                    onClick={() => visitProfile(post.user!.name)}
                  >
                    <p className={styles.userName}>{post.user!.name}</p>
                  </div>
                  <p className={styles.category}>{post.category}</p>
                  <div className={styles.date}>
                    <p>
                      {' '}
                      {post.date?.substr(0, 10)} {post.date?.substr(11, 8)}
                    </p>
                  </div>
                </Box>
                <Box className={styles.contentContainer2}>
                  <h3 className={styles.postTitle}>{post.title}</h3>

                  {token && post.user?._id == profile?._id && (
                    <>
                      <Button
                        type='submit'
                        onClick={() => deletePostByid()}
                        className={styles.buttonZ}
                      >
                        Usuń
                      </Button>
                    </>
                  )}
                </Box>
                <Box className={styles.infoBox}>
                  <p className={styles.content}>{post.content}</p>
                </Box>

                <p className={styles.minorInfo}>
                  Ocena: {likes}
                  {token && post.user?._id != profile?._id && (
                    <div style={{ marginLeft: '10px', marginBottom: '10px' }}>
                      <ThumbUpIcon
                        style={{
                          fontSize: 30,
                          marginRight: '10px',
                          marginTop: -10,
                          color: thumbColors.up,
                        }}
                        className={styles.thumb}
                        onClick={() => ratePost()}
                      />
                    </div>
                  )}
                </p>

                <Box className={styles.commentsContainer}>
                  Komentarze:
                  {post.comments!.map((value) => {
                    return (
                      <Box className={styles.comContainer}>
                        <div
                          className={styles.list}
                          onClick={() => visitProfile(value.name)}
                        >
                          <Box className={styles.avatarContainer}>
                            <img
                              className={styles.photocom}
                              height='50'
                              width='50'
                              src={value.avatar}
                              alt='avatar'
                            />
                          </Box>
                        </div>
                        <Box className={styles.contentContainer}>
                          <Box className={styles.contentContainer2}>
                            <div
                              className={styles.list}
                              onClick={() => visitProfile(value.name)}
                            >
                              <p className={styles.comName}>{value.name}</p>
                            </div>
                            {token && profile?.name == value.name && (
                              <>
                                <Button
                                  type='submit'
                                  onClick={() => deleteCom(value?._id)}
                                  className={styles.buttonZ2}
                                >
                                  Usuń
                                </Button>
                              </>
                            )}
                          </Box>

                          <p className={styles.comInfo}>{value.content}</p>
                        </Box>
                      </Box>
                    );
                  })}
                  {token && (
                    <form onSubmit={newComment}>
                      <Box className={styles.addCommentContainer}>
                        <CustomTextField
                          label='Dodaj komentarz'
                          variant='standard'
                          color='secondary'
                          multiline
                          style={{ width: '70%' }}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              content: e.currentTarget.value,
                            })
                          }
                        />
                        <Button type='submit' className={styles.button}>
                          Dodaj
                        </Button>
                      </Box>
                    </form>
                  )}
                </Box>
              </Box>
            </Box>,
          ]
        )}
      </Layout>
    </>
  );
};
