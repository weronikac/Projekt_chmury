import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Typography, IconButton, InputAdornment } from '@material-ui/core';
import { register } from '../api';
import { paths } from '../routing';
import { useLocalStorage } from '../hooks';
import { Layout } from '../components';
import { RegisterRequestI } from '../interfaces';
import {
  CustomButton,
  CustomTextField,
  FormWrapper,
  useFormStyles,
} from '../components';

export const Register: React.FC = () => {
  const history = useHistory();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [avatar, setAvatar] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [token, setToken] = useLocalStorage<string>('token', '');

  const styles = useFormStyles();

  // useEffect(() => {
  //   if (token) {
  //     history.push('/');
  //   }
  // }, [token]);

  const registerUser = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: RegisterRequestI = {
      name,
      email,
      bio,
      password,
      avatar,
    };

    try {
      if (password !== password2) {
        toast.error('Podane hasła nie są zgodne!');
      } else {
        const { data } = await register(user);
        setToken(data.token);
        toast.success('Zarejestrowano pomyślnie!');
        history.push('/login');
      }
    } catch (error) {
      toast.error('Pojawił się problem przy rejestracji!');
    }
  };

  return (
    <>
      <Layout>
        <FormWrapper title='Zarejestruj się!'>
          <form onSubmit={registerUser} className={styles.form}>
            <CustomTextField
              label='Username'
              variant='standard'
              color='secondary'
              onChange={(e) => setUsername(e.currentTarget.value)}
              value={name}
            />
            <CustomTextField
              label='Email'
              variant='standard'
              color='secondary'
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <CustomTextField
              label='Bio'
              variant='standard'
              color='secondary'
              onChange={(e) => setBio(e.currentTarget.value)}
              value={bio}
            />
            <CustomTextField
              label='Hasło'
              variant='standard'
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <CustomTextField
              label='Powtórz hasło'
              variant='standard'
              type={showPassword2 ? 'text' : 'password'}
              onChange={(e) => setPassword2(e.currentTarget.value)}
              value={password2}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword2(!showPassword2)}
                      onMouseDown={() => setShowPassword2(!showPassword2)}
                    >
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <CustomButton
              type='submit'
              color='secondary'
              variant='contained'
              className={styles.button}
            >
              <Typography variant='button'>Zarejestruj</Typography>
            </CustomButton>
          </form>
          <Link to={paths.LOGIN} className={styles.formLinkDisclaimer}>
            Masz już konto? <span>Zaloguj się!</span>
          </Link>
        </FormWrapper>
      </Layout>
    </>
  );
};
