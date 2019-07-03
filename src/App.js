import React from 'react';
import Resturants from './resturants.js';
import Main from './main.js';
import { BrowserRouter , Route  } from "react-router-dom";

import $ from 'jquery';

function App() {
  return (
    <BrowserRouter  >
    <Route path="/SearchResult" component={Resturants}></Route>
    <Route path="/" component={Main}></Route>
    </BrowserRouter  >
    );
}

export default App;
