import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar, Card, IconButton} from 'react-native-paper';
import {FirstText} from '../Helper/FirstText';
import CustomText from './CustomText';



const PeopleCard = ({key,backgroundColor, person, contact, specialization, image,navigation}) => {
  return (
    <TouchableOpacity key={key}
    underlayColor="#ce7575"
    activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        margin: 10,
        borderRadius:10
      }}

      onPress={()=> navigation.navigate('ViewPeople',{person:person,contact:contact,specialization:specialization,image:image,backgroundColor:backgroundColor})}
      
      >
      <View
        style={{
          width: '30%',
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {image === null ? (
          <Avatar.Text 
             style={{ backgroundColor: backgroundColor}}
            size={60} label={FirstText(person)} />
        ) : (
          <Avatar.Image
          style={{ backgroundColor: backgroundColor}}
            size={60}
            source={{ uri: image }}
            // source={require('../assets/images/profile.jpeg')}
          />
        )}
      </View>
      <View>
      <CustomText color={backgroundColor} title={"Name"} value={person} />
      <CustomText color={backgroundColor} title={"Specialization"} value={specialization} />
      <CustomText color={backgroundColor} title={"Contact"} value={contact} />
      </View>
    </TouchableOpacity>
  );
};


export default PeopleCard;

const styles = StyleSheet.create({
  box: {
    // justifyContent:"center",
    alignItems: 'center',
    padding: 5,
  },
  textstyle: {
    color: 'black',
    fontSize: 14,
  },
});
