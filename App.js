import React from 'react';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Redux Store
import cryptosReducer from './store/reducers/cryptos';

// Navigator
import Navigator from './navigation/Navigator';

// Persistent storage
import { init } from './helpers/db';

import { enableScreens } from 'react-native-screens';
enableScreens();

console.disableYellowBox = true;

// Initialize DB
init()
  .then(() => {
    console.log('Database initialized');
  })
  .catch(err => {
    console.log('Failed to initialize database');
    console.log(err);
  })

// Combined root reducer
const rootReducer = combineReducers({
  cryptos: cryptosReducer
});

// Redux Store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
        <Navigator/>
    </Provider>
  );

}