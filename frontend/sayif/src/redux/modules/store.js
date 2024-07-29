import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import member from './member';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['member'],
};

const rootReducer = combineReducers({ member });

export default persistReducer(persistConfig, rootReducer);
