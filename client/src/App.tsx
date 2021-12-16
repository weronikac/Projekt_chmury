// import logo from './logo.svg';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from './styles';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Routing } from './routing';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
         <ThemeProvider theme={theme.default}> 
          <CssBaseline />
          <Routing />
         </ThemeProvider> 
    </Router>
  );
}

export default App;
