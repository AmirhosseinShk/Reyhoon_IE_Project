import React from 'react';
import Resturants from './resturants.js';
import Main from './main.js';
import Order from './order.js';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter  >
      <Route path="/order" component={Order}></Route>
      <Route path="/SearchResult" component={Resturants}></Route>
      <Route exact path="/" component={Main}></Route>
    </BrowserRouter  >
  );
}

export default App;
