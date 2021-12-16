import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Typography, IconButton, InputAdornment } from '@material-ui/core';
import { login } from '../api';
import { paths } from '../routing';
import { Layout } from '../components';
import { useLocalStorage } from '../hooks';
import { LoginRequestI } from '../interfaces';
import {
  CustomButton,
  CustomTextField,
  FormWrapper,
  useFormStyles,
} from '../components';

export const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useLocalStorage<string>('token', '');

  const styles = useFormStyles();

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token]);

  const loginUser = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: LoginRequestI = {
      email,
      password,
    };

    try {
      const { data } = await login(user);
      setToken(data);
      console.log(data);
      toast.success('Zalogowano pomyślnie!');
    } catch (error: any) {
      if (error.message == 'Konto nie jest aktywne')
        toast.error('Konto nie jest aktywne');
      else toast.error('Nieprawidłowe dane!');
    }
  };

  return (
    <>
      <Layout>
        <FormWrapper title='Zaloguj się!'>
          <form onSubmit={loginUser} className={styles.form}>
            <CustomTextField
              label='Email'
              variant='standard'
              color='secondary'
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
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

            <CustomButton
              type='submit'
              color='secondary'
              variant='contained'
              className={styles.button}
            >
              <Typography variant='button'>Zaloguj</Typography>
            </CustomButton>
          </form>
          <Link to={paths.REGISTER} className={styles.formLinkDisclaimer}>
            Nie masz jeszcze konta? <span>Zarejestruj się!</span>
          </Link>
        </FormWrapper>
      </Layout>
    </>
  );
};
