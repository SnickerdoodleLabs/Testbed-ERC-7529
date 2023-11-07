import React from 'react';
import "reflect-metadata";
import './App.css';
import './Footer';
import Footer from './Footer';
import DomainInput from './DomainInput';

function App() {
  return (
    <>
      <div className='App-body'>
        <div>
          Search for contracts by domain name with <a href='https://www.npmjs.com/package/@snickerdoodlelabs/erc7529'>ERC-7529</a>!
        </div><br />
        <DomainInput />
      </div>
      <Footer />
    </>
  );
}

export default App;
