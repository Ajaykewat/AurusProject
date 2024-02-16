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
    updatePersonImage(state, action) {
      const { person,contact, imagePath } = action.payload;
      const personToUpdate = state.find(p => p.contact === contact);
      if (personToUpdate) {
        personToUpdate.image = imagePath;
      }
    },
  },
})

export const { PeopleAdd, PeopleUpdate,updatePersonImage } = PeopleSlice.actions

export default PeopleSlice.reducer