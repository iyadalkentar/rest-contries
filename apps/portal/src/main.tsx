import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import {
  STORE_PORTAL_FEATURE_KEY,
  portalReducer,
} from './app/store/portal.slice';
import {
  countriesReducer,
  STORE_COUNTRIES_FEATURE_KEY,
} from '@rest-countries/country';

const store = configureStore({
  reducer: {
    [STORE_PORTAL_FEATURE_KEY]: portalReducer,
    [STORE_COUNTRIES_FEATURE_KEY]: countriesReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
