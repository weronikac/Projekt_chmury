import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { colors } from '../styles';

interface Props {}

const useStyles = makeStyles((theme) => ({
  more: {
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    color: colors.BLUE,
    textDecoration: 'underline',
  },
}));
const ReadMore: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const [isHidden, setIsHidden] = useState(true);
  return (
    <>
      {!isHidden && <div>{children}</div>}

      <p onClick={() => setIsHidden(!isHidden)} className={classes.more}>
        {isHidden ? 'Rozwiń treść posta' : 'Zwiń'}
      </p>
    </>
  );
};

export default ReadMore;
