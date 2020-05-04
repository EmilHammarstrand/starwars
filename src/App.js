import React from 'react';
import './App.css';

import List from './components/List'

const App = () => (
    <main>
      <div className="resultContainer">
      <h2>Star Wars</h2>
        <div className="resultbox">
          <List />
        </div>
        <button className="findBtn">Find character</button>
      </div>
    </main>
);

export default App;
