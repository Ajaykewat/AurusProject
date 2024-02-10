import { configureStore } from '@reduxjs/toolkit'
import PeopleReducer from './Slice/PeopleSlice';

export const store = configureStore({
    reducer: {
      People: PeopleReducer,
    },
  })