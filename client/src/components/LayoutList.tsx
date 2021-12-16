import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  makeStyles,
  Select,
  MenuItem,
} from '@material-ui/core';
import { colors } from '../styles';
import { Logo } from '../assets';
import { useLocalStorage } from '../hooks';
import { NavLink, useHistory, useParams } from 'react-router-dom';
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
  listspec: {
    marginTop: 100,
    marginLeft: 35,
  },
  list: {
    cursor: 'pointer',
  },
  select: {
    width: '80%',
    marginLeft: 30,
    marginTop: 100,
    fontSize: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    fontSize: 20,
    fontWeight: 400,
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
interface Params {
  category: string;
}

export const LayoutList: React.FC<LayoutI> = ({ children }) => {
  const styles = useStyles();
  const history = useHistory();
  const params: Params = useParams();
  const [token, setToken] = useLocalStorage<string>('token', '');
  const [tag, setTag] = useState<string>('');

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

  const changeCategory = (event: any) => {
    window.location.assign('/category/' + event.target.value);
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
          <Box className={styles.rightContainer}>
            <Box className={styles.select}>
              <label className={styles.category}>Szukaj według kategorii</label>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={params.category}
                label='Kategoria'
                onChange={changeCategory}
              >
                <MenuItem value={'Chirurgia'}>Chirurgia</MenuItem>
                <MenuItem value={'Dermatologia'}>Dermatologia</MenuItem>
                <MenuItem value={'Endokrynologia'}>Endokrynologia</MenuItem>
                <MenuItem value={'Gastrologia'}>Gastrologia</MenuItem>
                <MenuItem value={'Ginekologia'}>Ginekologia</MenuItem>
                <MenuItem value={'Kardiologia'}>Kardiologia</MenuItem>
                <MenuItem value={'Laryngologia'}>Laryngologia</MenuItem>
                <MenuItem value={'Neurologia'}>Neurologia</MenuItem>
                <MenuItem value={'Onkologia'}>Onkologia</MenuItem>
                <MenuItem value={'Ortopedia'}>Ortopedia</MenuItem>
                <MenuItem value={'Pediatria'}>Pediatria</MenuItem>
                <MenuItem value={'Psychiatria'}>Psychiatria</MenuItem>
                <MenuItem value={'Reumatologia'}>Reumatologia</MenuItem>
                <MenuItem value={'Urologia'}>Urologia</MenuItem>
                <MenuItem value={'Inne'}>Inne</MenuItem>
              </Select>
            </Box>
          </Box>
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
          <Box className={styles.rightContainer}>
            <Box className={styles.select}>
              <label className={styles.category}>Szukaj według kategorii</label>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={params.category}
                label='Kategoria'
                onChange={changeCategory}
              >
                <MenuItem value={'Chirurgia'}>Chirurgia</MenuItem>
                <MenuItem value={'Dermatologia'}>Dermatologia</MenuItem>
                <MenuItem value={'Endokrynologia'}>Endokrynologia</MenuItem>
                <MenuItem value={'Gastrologia'}>Gastrologia</MenuItem>
                <MenuItem value={'Ginekologia'}>Ginekologia</MenuItem>
                <MenuItem value={'Kardiologia'}>Kardiologia</MenuItem>
                <MenuItem value={'Laryngologia'}>Laryngologia</MenuItem>
                <MenuItem value={'Neurologia'}>Neurologia</MenuItem>
                <MenuItem value={'Onkologia'}>Onkologia</MenuItem>
                <MenuItem value={'Ortopedia'}>Ortopedia</MenuItem>
                <MenuItem value={'Pediatria'}>Pediatria</MenuItem>
                <MenuItem value={'Psychiatria'}>Psychiatria</MenuItem>
                <MenuItem value={'Reumatologia'}>Reumatologia</MenuItem>
                <MenuItem value={'Urologia'}>Urologia</MenuItem>
                <MenuItem value={'Inne'}>Inne</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
