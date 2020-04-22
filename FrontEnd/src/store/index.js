/**
 * This file has the main imports needed to set up our store.
 * The store will have our state(refer to react state), and we will
 * use various other modules to monitor and update our store for our app to use.
 */

 /**
  * - combineReducers allow us to store all reducers created into 
  * one source to ease integration into the store
  * https://redux.js.org/api/combinereducers
  * - applyMiddleware is used to extend redux functionality by allowing
  * the user to do custom modifications -> ex: thunk middleware
  * https://redux.js.org/api/applymiddleware
  * createStore creates the store housing our state tree for the app, there should
  * only be one store
  * https://redux.js.org/api/createstore
  */
 import { combineReducers, applyMiddleware, createStore } from 'redux';

 /**
  * createLogger displays state updates on action dispatches and eases
  * monitoring of state and potential errors
  * https://github.com/LogRocket/redux-logger
  */
 import { createLogger } from 'redux-logger';
 
 /**
  * thunkMiddleware is an intermediary between actions being dispatched 
  * and reaching the reducer. It is useful in asycnronous calls,
  * meaning it basically is useful for delaying evaluation of expressions.
  * https://frontend.turing.io/lessons/module-3/redux-thunk-middleware.html?ads_cmpid=6451354298&ads_adid=76255849919&ads_matchtype=b&ads_network=g&ads_creative=378056926252&utm_term=&ads_targetid=dsa-19959388920&utm_campaign=&utm_source=adwords&utm_medium=ppc&ttv=2&gclid=Cj0KCQjws_r0BRCwARIsAMxfDRhkUTA1L9FSMPE9clPlALWf82H59haJvOjSA_hZPi960zrMsijp-ZYaAsgrEALw_wcB
  */
 import thunkMiddleware from 'redux-thunk';
 
 /**
  * useful chrome extension analysis, see below to install
  * https://github.com/zalmoxisus/redux-devtools-extension
  */
 import{ composeWithDevTools } from 'redux-devtools-extension';
 
 /**
  * Here we import all reducers we will be using. Reducers
  * will provide the functionality for our app. 
  */
 // we have none so far hahahahaaha
 
 /** Here we are having one variable store all reducers, its empty for now */
 const rootReducer = combineReducers({})
 const logger = createLogger({ collapsed: true});
 const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
 const store = createStore(rootReducer, middleware);
 
 // by declaring this default export, when other files import from here the store variable will be used.
 export default store;
 