import React, { useState } from 'react';
import Header from './headers/Header';
import Main from './mains/Main';
import Footer from './footers/Footer';

const Body = ({ authCode }) => {
  const [code, setCode] = useState(''); 

  return (
    <div>
      <header>
        <Header setCode={setCode} />
      </header>
      <main>
        <Main code={code} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Body;
