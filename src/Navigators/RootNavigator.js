import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register/Register';
import ViewPeople from '../screens/Profile/ViewPeople';
import People from '../screens/Profile/People';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Provider store={store}>
    <PaperProvider>
    <NavigationContainer>
        <Stack.Navigator initialRouteName='People'>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="People" component={People} />
        <Stack.Screen name="ViewPeople" component={ViewPeople} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </Provider>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})