import { combineReducers, configureStore } from '@reduxjs/toolkit'
import PeopleReducer from './Slice/PeopleSlice';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';


const rootReducer = combineReducers({
  People: PeopleReducer,
});

const persistConfig = {
  key: 'root', 
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);