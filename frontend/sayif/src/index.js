import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './redux/modules/store';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer: rootReducer });
const persistor = persistStore(store);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

export default store;

reportWebVitals();
