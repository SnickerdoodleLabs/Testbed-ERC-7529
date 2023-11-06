import React from 'react';
import './App.css';
import './Footer';
import Footer from './Footer';
import DomainInput from './DomainInput';

function App() {
  return (
    <>
      <div className='App-body'>
        <div>
          Search for contracts by domain name with ERC-7529!
        </div><br />
        <DomainInput />
      </div>
      <Footer />
    </>
  );
}

export default App;
