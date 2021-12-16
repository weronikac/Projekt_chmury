import React, { useState } from 'react';
import { Box, IconButton, InputAdornment, makeStyles } from '@material-ui/core';
import { colors } from '../styles';
import { Logo } from '../assets';
import { useLocalStorage } from '../hooks';
import { NavLink, useHistory } from 'react-router-dom';
import { AskButton, CustomTextField } from '.';
import styled from 'styled-components';
import { Search } from '@material-ui/icons';

interface LayoutI {}

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    width: '100%',
    minWidth: '900px',
    minHeight: '650px',
  },
  searchbar: {
    width: '250px',
    '& .MuiInputBase-root': {
      fontSize: 15,
    },
  },
  logoContainer: {
    width: '25%',
    display: 'flex',
    justifyContent: 'right',
    flexDirection: 'column',
  },
  logo: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'column',
  },
  rightContainer: { width: '25%' },
  navigationContainer: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '60px',
  },
  mainContainer: {
    width: '50%',
  },
  profileNavigation: {
    display: 'flex',
    justifyContent: 'left',
    marginTop: '10px',
    marginLeft: '5px',
    padding: '10px',
    '& .hover': {
      cursor: 'pointer',
      color: '#ffb800',
    },
  },
  middleContainer: {
    display: 'flex',
    justifyContent: 'right',
  },
}));
const NavbarLink = styled(NavLink)`
  display: flex;
  color: #1f3a94;
  flex-wrap: 'wrap';
  vertical-align: 'middle';
  padding: 13x 10px 50px 10px;
  text-decoration: none;
  font-size: 24px;
  list-style: none;
  justify-content: 'left';
  align-items: 'center';
  &:hover {
    cursor: pointer;
    color: #c43634;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

export const Layout: React.FC<LayoutI> = ({ children }) => {
  const styles = useStyles();
  const history = useHistory();

  const [token, setToken] = useLocalStorage<string>('token', '');

  const logoutHandler = async () => {
    try {
      setToken('');
      localStorage.removeItem('token');
      history.push('/');
    } catch (error) {
      console.log('There was an error when logging out!', error);
    }
  };

  const mainPage = () => {
    history.push('/');
  };

  return (
    <>
      {!token ? (
        <Box className={styles.pageContainer}>
          <Box className={styles.navigationContainer}>
            <Box className={styles.logoContainer}>
              <div className={styles.logo} onClick={(e) => mainPage()}>
                <Logo />
              </div>
            </Box>
            <Box className={styles.mainContainer}>
              <Box className={styles.middleContainer}></Box>
            </Box>
            <Box className={styles.rightContainer}>
              <Box className={styles.profileNavigation}>
                <NavbarLink to={'/login'} style={{ textDecoration: 'none' }}>
                  <SidebarLabel>Zaloguj</SidebarLabel>
                </NavbarLink>
                <NavbarLink to={'/register'} style={{ textDecoration: 'none' }}>
                  <SidebarLabel>Zarejestruj</SidebarLabel>
                </NavbarLink>
              </Box>
            </Box>
          </Box>

          <Box className={styles.logoContainer}></Box>
          <Box className={styles.mainContainer}>{children}</Box>
          <Box className={styles.rightContainer}></Box>
        </Box>
      ) : (
        <Box className={styles.pageContainer}>
          <Box className={styles.navigationContainer}>
            <Box className={styles.logoContainer}>
              <div className={styles.logo} onClick={(e) => mainPage()}>
                <Logo />
              </div>
            </Box>
            <Box className={styles.mainContainer}>
              <Box className={styles.middleContainer}>
                <NavLink to={'/ask'} style={{ textDecoration: 'none' }}>
                  <AskButton>Zadaj pytanie</AskButton>
                </NavLink>
              </Box>
            </Box>
            <Box className={styles.rightContainer}>
              <Box className={styles.profileNavigation}>
                <NavbarLink
                  to={'/myprofile'}
                  style={{ textDecoration: 'none' }}
                >
                  <SidebarLabel>Profil</SidebarLabel>
                </NavbarLink>
                <NavbarLink
                  to={'/'}
                  onClick={logoutHandler}
                  style={{ textDecoration: 'none' }}
                >
                  <SidebarLabel>Wyloguj</SidebarLabel>
                </NavbarLink>
              </Box>
            </Box>
          </Box>
          <Box className={styles.logoContainer}></Box>
          <Box className={styles.mainContainer}>{children}</Box>
          <Box className={styles.rightContainer}></Box>
        </Box>
      )}
    </>
  );
};
