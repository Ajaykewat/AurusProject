import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PeopleList from '../../components/PeopleList';
import peoples from '../../utils/Peoples.json'
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadPeopleData } from '../../redux/Slice/PeopleSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowMessage } from '../../Helper/ShowMessages';
import { useFocusEffect } from '@react-navigation/native';

const People = ({navigation}) => {
  const dispatch = useDispatch();
  const peopleData = useSelector(state => state.People);
  const[load,setlaod]=useState(true)
  console.log("peopleData",peopleData)

  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadPeopleData());
    }, [dispatch])
  );


  const HandleLogout = async()=>{
   await AsyncStorage.clear();
   ShowMessage("Logout Successfully")
   navigation.replace('Register') 
  }

  return (
    <View style={styles.container}>
    <View style={{ justifyContent:"flex-end",alignItems:"flex-end",padding:10 }}>
      <Button  mode="contained"  style={{ width:100,backgroundColor:"red" }} onPress={HandleLogout}>
   Logout 
  </Button>
      </View>
    {
      peopleData != undefined && peopleData.length > 0 ?(
        <PeopleList navigation={navigation} data={peopleData} />
      ):(
        <View style={{ flex:1,justifyContent:"center",alignItems:"center" }}>
        <Text style={{ color:"black",fontSize:16 }}>Add People on clicking the below button </Text>
        </View>
      )
    }
      
      <View style={styles.spacer}>
      <Button  mode="contained" onPress={() => navigation.navigate("Register")}>
    Add People
  </Button>
      </View>
      
    </View>
  )
}

export default People

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:10
  },
  spacer:{
    marginVertical:20
  }
})