import React from 'react';

import Header from '../Components/Header/Header.jsx';
import Main from '../Components/Main/Main.jsx';
import Footer from '../Components/Footer/Footer.jsx';

import { AppContainer } from './App.styles.js';

const App = () => {
  return (
      <AppContainer>
        <Header />
        <Main />
        <Footer />
      </AppContainer>
  )
}

export default App