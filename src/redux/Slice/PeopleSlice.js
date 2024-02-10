import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'

const PeopleSlice = createSlice({
  name: 'People',
  initialState: [],
  reducers: {
    PeopleAdd(state, action) {
      state.push({
        name: action.payload.name,
        specialization: action.payload.specialization,
        contact: action.payload.contact,
        image: action.payload.image,
      })
    },
    PeopleUpdate(state, action) {
      state.push({
        name: action.payload.name,
        specialization: action.payload.specialization,
        contact: action.payload.contact,
        image: action.payload.contact,
      })
    },
    loadPeople(state, action) {
      return action.payload;
    },
  },
})

export const { PeopleAdd, PeopleUpdate,loadPeople } = PeopleSlice.actions

export const loadPeopleData = () => async (dispatch) => {
  try {
    const jsonValue = await AsyncStorage.getItem('peopleData');
    if (jsonValue !== null) {
      const data = JSON.parse(jsonValue);
      dispatch(loadPeople(data));
    }
  } catch (error) {
    console.error('Error loading people data:', error);
  }
};

export default PeopleSlice.reducer