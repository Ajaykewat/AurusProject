import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {Avatar, Button} from 'react-native-paper';
import {FirstText} from '../../Helper/FirstText';
import CustomText from '../../components/CustomText';
import Icon, { Icons } from '../../components/Icons';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowMessage } from '../../Helper/ShowMessages';
import { useDispatch } from 'react-redux';
import { updatePersonImage } from '../../redux/Slice/PeopleSlice';
const ViewPeople = ({navigation, route}) => {
  const {person, contact, specialization, image,backgroundColor} = route.params;
  const dispatch = useDispatch();

  const[Img,setImg]=useState("");
  const[message,setmessage]=useState("");

const selectoption = () => {

  setmessage("Image upload not completed,  due to device image not able to save in app, i have to access the file manage and create a folder and add image in local device then access that image in app i dont think you need this majorly but it is here if you want to add any option in the future");

  Alert.alert('', "Select Options", [
    {
      text: "Cancel",
      onPress: () => console.log('Cancel'),
    },
    {
      text: "Camera",
      onPress: () => HandlePickupDocs('camera'),
    },
    {
      text: "Document",
      onPress: () => HandlePickupDocs('document'),
    },
  ]);
};

const HandlePickupDocs = async type => {
  if (type == 'document') {
    try {

      if (Platform.OS == 'ios') {
        ImagePicker.openPicker({
          width: 1280,
          height: 1280,
          cropping: true,
          includeBase64: true,
          mediaType: "photo",
          multiple: false,
          quality: 0.7
        }).then(image => {
          console.log(JSON.stringify(image.path));
          HandleAddImage(image.path)
          // HandlePickupImage(image, "camera");
        });
      } else {
        const results = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        console.log(JSON.stringify(results[0].uri));
        HandleAddImage(results[0].uri)
        // HandlePickupImage(results[0], 'document');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  if (type == 'camera') {
    try {
      ImagePicker.openCamera({
        width: 1280,
        height: 1280,
        cropping: true,
        includeBase64: true,
        mediaType: 'photo',
        multiple: false,
        quality: 0.7,
      }).then(Image => {
        console.log(JSON.stringify(Image.path));
        HandleAddImage(Image.path)
        // HandlePickupImage(Image, 'camera');

      });
    } catch (error) {
      console.log(error);
    }
  }
};

const HandleAddImage = async(imagePath)=>{
console.log("imagePath",imagePath)
  try {
    dispatch(updatePersonImage({ person: person,contact:contact, imagePath: imagePath }));
    ShowMessage("Image Updated Successfully")
    navigation.navigate('People');
  } catch (error) {
    console.error('Error updating image:', error);
  }
  setImg(imagePath);

}

  return (
    <View style={{flex: 1,paddingHorizontal:20}}>
    <View>
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={selectoption}
        style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
        {image  === null && Img == "" ? (
          <Avatar.Text style={{ backgroundColor:backgroundColor }} size={200} label={FirstText(person)} />
        ) : (
          image === null && Img != "" ? (
          <Avatar.Image
          style={{ backgroundColor:backgroundColor }}
            size={200}
             source={{ uri: Img }}
          />
         ):(
          <Avatar.Image
          style={{ backgroundColor:backgroundColor }}
            size={200}
            source={{ uri: image }}
            //  source={require('../../assets/images/profile.jpeg')}
          />
         ) 
        )}
        <View style={{ position:"absolute",right:100,bottom:30 }}>
        <Icon
        type={Icons.FontAwesome5}
                    name={'user-edit'}
                    color={"gray"}
                    size={25}
                  />
        </View>
        
      </TouchableOpacity>

      </View>

      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 20,marginBottom:350}}>
        <CustomText title={'Name'} value={person} />
        <CustomText title={'Specialization'} value={specialization} />
        <CustomText title={'Contact'} value={contact} />
      </View>

      <CustomText color={backgroundColor} value={message} />

      <View style={styles.spacer}>
      <Button  mode="contained" onPress={() => navigation.goBack()}>
    Go Back
  </Button>
      </View>
    </View>
  );
};

export default ViewPeople;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  spacer:{
    marginVertical:20
  }
});
