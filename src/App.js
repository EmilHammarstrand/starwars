import React from 'react';
import './App.css';

import List from './components/List'
import Search from './components/Search'

const App = () => (
    <main>
      <div className="resultContainer">
      <h2>Star Wars</h2>
        <div className="resultbox">
          <List />
        </div>
        <button className="findBtn">Add character</button>
        <Search />
      </div>
    </main>
);

export default App;
