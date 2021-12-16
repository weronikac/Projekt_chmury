import React from 'react';
import { colors } from '../styles';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loader: {
    margin: '30px auto',
    height: '42px',
    marginTop: '100px',
    width: '42px',
    border: `4px solid ${colors.DARK_GREY}`,
    borderRightColor: colors.RED,
    borderRadius: '50%',
    animation: '$rotate 1s infinite linear',
  },

  '@keyframes rotate': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

export const Loading: React.FC = () => {
  const styles = useStyles();
  return <div className={styles.loader} />;
};
