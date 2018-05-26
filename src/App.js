import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Home from './components/home.js';
import './App.css';
const theme = createMuiTheme({
  palette: {
    primary: {
     'main': '#3f50b5'
    },
    secondary: {
      'main': '#E3F2FD'
    }
  },
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Home />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App