import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PeopleCard from './PeopleCard'


const RandomColor = ["#f1e0b0", "#84a0eb", "#d7ebbc", "#97f2f3"];

const PeopleList = ({data,navigation}) => {

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * RandomColor.length);
    return RandomColor[randomIndex];
  };

  console.log("PeopleList", data)

  return (
    <View style={styles.container}>
 <FlatList
        data={data}
        keyExtractor={item => item?.contact.toString()}
        renderItem={({item ,index}) => <PeopleCard backgroundColor={getRandomColor()} key={index}  person={item.name} specialization={item.specialization} contact={item.contact} image={item.image} navigation={navigation} />}
      />
    </View>
  )
}



export default PeopleList

const styles = StyleSheet.create({
    container:{
        flex:1,
      }
})