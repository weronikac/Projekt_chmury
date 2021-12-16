import { createMuiTheme } from '@material-ui/core';
import { colors } from './colors';

export const theme = {
  default: createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            fontVariantNumeric: 'lining-nums',
          },

          '*::-webkit-scrollbar': {
            width: '13px',
            height: '13px',
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#bfbfbf',
            borderRadius: '10px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#9e9e9e',
          },
          '*::-webkit-scrollbar-track': {
            background: '#424242',
            borderRadius: '10px',
          },
        },
      },
    },
    typography: {
      h1: {
        fontWeight: 700,
        fontSize: 36,
        margin: '1rem 0',
      },
      h2: {
        fontWeight: 400,
        fontSize: '2rem',
      },
      button: {
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: 700,
      },
      h3: {
        fontSize: 49,
        lineHeight: '52px',
        color: colors.DEEP_OCEAN,
      },
      h4: {
        fontSize: 16,
        fontWeight: 400,
        color: colors.BLACK2,
        marginTop: 20,
      },
      h6: {
        fontSize: 20,
        lineHeight: '32px',
        fontWeight: 400,
      },
      htmlFontSize: 10,
      allVariants: {
        fontFamily: 'Raleway, sans-serif',
      },
    },
    palette: {
      type: 'light',
      background: {
        default: colors.LIGHT_BLUE,
      },
      // primary: {
      //   main: colors.SECONDARY,
      //   light: colors.DARK_GREY,
      // },
      // secondary: {
      //   main: colors.BLACK,
      // },
    },
  }),
};
