import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import translations from './translations';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Translation Setup Demo</h2>
        </div>
        <p className="App-intro">
          {translations.something}
        </p>
      </div>
    );
  }
}

export default App;
