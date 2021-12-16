import { TextField, withStyles } from '@material-ui/core';
import { colors } from '../styles';

export const CustomTextField = withStyles({
  root: {
    margin: '10px 0',
    color: colors.BLACK,
    witdh: '1000px',

    '& .MuiInputBase-root': {
      color: colors.BLACK,
      fontSize: 20,
      fontWeight: 500,
    },

    '& .MuiInputLabel-root': {
      fontSize: 16,
      fontWeight: 400,
      color: colors.BLACK,
    },

    '& .MuiInputLabel-root.Mui-error': {
      color: colors.RED,
    },

    '& .MuiFormHelperText-root': {
      fontSize: 12,
      fontWeight: 400,
      color: colors.BLACK,
    },

    '& .MuiFormHelperText-root.Mui-error': {
      color: colors.RED,
    },

    '& .MuiIconButton-label > svg': {
      width: 20,
      height: 20,
      color: colors.BLACK,
    },

    '& .MuiInput-underline:after': {
      borderBottom: `2px solid ${colors.BLACK}`,
    },

    '& .MuiInput-underline:before': {
      borderBottom: `1px solid ${colors.DARK_GREY}`,
    },

    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${colors.MEDIUM_GREY}`,
    },
  },
})(TextField);
