'use client';

import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { reduxStore } from './store';

const persistor = persistStore(reduxStore);

const Providers = ({ children }: React.PropsWithChildren) => (
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

export default Providers;
