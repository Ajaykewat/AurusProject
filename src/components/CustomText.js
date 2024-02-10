import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
  
const CustomText = ({color,title,value})=>{
    return (
        <View style= {{flexDirection:"row", justifyContent:"flex-start",alignItems:"center"}}>
        <Text style={{ color:"gray",fontSize:14 }}>{title}:  </Text>
        <Text style={{ color:"black",fontSize:18 }}>{value}</Text>
      </View>
    )
  }
  
  export default CustomText
  
  const styles = StyleSheet.create({})