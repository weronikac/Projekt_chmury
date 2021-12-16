import { Button, withStyles } from '@material-ui/core';
import { colors } from '../styles';

export const AskButton = withStyles((theme) => ({
  root: {
    borderRadius: 5,
    width: 200,
    height: 30,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.WHITE,
    fontSize: 16,
    backgroundColor: colors.BLUE,
    '&:hover': {
      backgroundColor: colors.RED,
    },
  },
}))(Button);
