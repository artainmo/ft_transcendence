import React from 'react';
import Authentification from './pages/userAccount/authentification';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (<BrowserRouter>
                <Routes>
                  <Route path='/' element={<Authentification />} />
                </Routes>
          </BrowserRouter>);
}
//Routes are used to enable the queryparam extraction afterwards
