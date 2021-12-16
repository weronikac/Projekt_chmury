import React from 'react';
import { Box, Typography, makeStyles, Theme } from '@material-ui/core';
import { colors } from '../styles';

interface FormWrapperI extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  isForm?: boolean;
}

export const useFormStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    overflowY: 'auto',
    marginBottom: 30,
    width: '100%',
    padding: 10,
    listStyle: 'none',
    border: `1px solid ${colors.BORDER_GRAY}`,
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
    '& .MuiTypography-displayBlock': {
      fontSize: '18px',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  info: {
    marginTop: 100,
    marginLeft: 50,
  },
  infoAsk: {
    fontSize: 19,
    fontWeight: 400,
  },
  button: {
    borderRadius: 5,
    height: 50,
    marginTop: 30,

    '& .MuiTypography-button': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
  formLink: {
    textDecoration: 'none',
    color: colors.RED,
    fontSize: 15,
    fontWeight: 400,
    marginTop: 15,
    textAlign: 'right',
  },
  formLinkDisclaimer: {
    textDecoration: 'none',
    color: colors.DARK_GREY,
    fontSize: 16,
    fontWeight: 400,
    marginTop: 30,
    textAlign: 'center',
    cursor: 'pointer',

    '& span': {
      color: colors.RED,
      textDecoration: 'underline',
    },
  },
  underlineLink: {
    textDecoration: 'underline',
  },
  hashtags: {
    display: 'flex',
    flexFlow: 'row',
  },
}));

const useStyles = makeStyles<Theme, { isForm: boolean }>((theme) => ({
  pageContainer: {
    display: 'flex',
    height: '100%',
    width: '100vw',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    justifySelf: 'center',
    padding: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 10,
  },
  formBox: {
    padding: '40px 70px 40px 70px',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    width: '550px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 576,
    position: 'relative',
  },
  formTitle: {
    textAlign: 'left',
    fontSize: 35,
    fontWeight: 400,
    color: colors.DARK_GREY,
  },
}));

export const FormWrapper: React.FC<FormWrapperI> = ({
  title,
  children,
  isForm = true,
}: FormWrapperI) => {
  const styles = useStyles({ isForm });
  return (
    <>
      <Box className={styles.formContainer}>
        <Box className={styles.formBox}>
          {title && (
            <Typography className={styles.formTitle}>{title}</Typography>
          )}
          {children}
        </Box>
      </Box>
    </>
  );
};
