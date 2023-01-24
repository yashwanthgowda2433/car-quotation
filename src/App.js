import React from 'react';
import './App.css';

import Header from './Components/Layouts/Header';
import InputForm from './Components/Layouts/InputForm';

class App extends React.Component {
  
  render() {
    return (
      <div className="app" style={{width:"100%",overflowX:"hidden"}}>
        <Header/>
        <InputForm/>
      </div>
    );
  }
}

export default App;
