import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loggin from './components/loggin/loggin';
//importamos los comp creados
import Home from './components/home';
import NavBarExample from './layouts/navbar';

function App() {
  const [autentication, setautentication] = React.useState(false);
  const chooseMessage = (message) => {  
    setautentication(message);
  };

  return (
    <div className="App">
       

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}>

              <Route path='*' element={<Home />} />
            </Route>
            <Route path='/loggin' element={  <Loggin chooseMessage={chooseMessage}></Loggin>}></Route>
          </Routes>
        </BrowserRouter>
      

    </div>
  );
}

export default App;
