/**
 * Default imports to use React Framework and 
 * the DOM(Document Object Model)
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * BrowserRouter is a version of react routing in order to match the
 * UI(User Interface) with the URL selected.
 * So it basically is one of many approaches 
 * to ensure what we see on the webpage matches the link we are at.
 * 
 * in other words
 * 
 * This provides the routing ability to change the URL to the 
 * appropriate link such that additional features can be loaded
 * in for our SPA(Single Page Application). It allowes the user to move backwards and
 * forwards in the webpage. Also provides deeplinking
 * where hyperlinks lead to a specific content instead of a 
 * general home page.
 * 
 * https://stackoverflow.com/questions/53065686/why-do-we-use-browserrouter-in-react
 */
import { BrowserRouter } from 'react-router-dom';

/**
 * This allows any components wrapped in the Provider to have
 * access to store. The store is our single source of truth. It 
 * containes our state and necesary info for our SPA.
 * For more https://react-redux.js.org/api/provider
 */
import { Provider } from 'react-redux';


import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'

// React.StrictMode has various advantages, ex: https://stackoverflow.com/questions/53183362/what-is-strictmode-in-react
ReactDOM.render(
  <Provider store={store}> 
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
