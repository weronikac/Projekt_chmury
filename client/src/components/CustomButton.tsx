import { Button, withStyles } from '@material-ui/core';
import { colors } from '../styles';

export const CustomButton = withStyles((theme) => ({
  root: {
    borderRadius: 10,
    color: colors.WHITE,
    backgroundColor: colors.BLUE,
    '&:hover': {
      backgroundColor: colors.RED,
    },
  },
}))(Button);
