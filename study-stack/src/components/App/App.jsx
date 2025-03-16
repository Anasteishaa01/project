import React, { useState, useEffect } from 'react';
import WordCard from '../WordCard/WordCard';
import '../App/App.scss'

function App() {
  return (
    <>
      <Header/>
      <WordCard/>
      <Footer/>
    </>
  );
}

export default App;