import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import PagesLinks from './pages/PagesLinks';
import PagesRouter from './pages/PageRouter';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import combinedReducer from './redux/reducers';

let store = createStore(combinedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <PagesLinks/>
          {/* <img src={logo} className="App-logo" alt="logo" />*/}
        </header>

        <main className="App-main">
          <PagesRouter/>
        </main>

        <footer className="App-footer">
        </footer>
      </div>
    </BrowserRouter>
    </Provider>
  );
}
export default App;
