import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Appearance } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { PeopleAdd } from '../../redux/Slice/PeopleSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowMessage } from '../../Helper/ShowMessages';

const Register = ({navigation}) => {

  const dispatch =useDispatch();

  useEffect(()=>{
    Appearance.setColorScheme('light')
  },[])

  const [inputText, setInputText] = useState([
    {
      label: "Enter Your Name",
      placeholder: "Enter Your Name",
      value: "",
      maxLength:30,
      keyboardType: "text",
      error: "",
    },
    {
      label: "Enter Your Specialization",
      placeholder: "Enter Your Specialization",
      value: "",
      maxLength:30,
      // keyboardType: "default",
      error: "",
    },
    {
      label: "Contact no. for appointments",
      placeholder: "Contact no. for appointments",
      value: "",
      maxLength:10,
      keyboardType: "numeric",
      error: "",
    },
  ]);

  const handleInputChange = (text, index) => {
    const updatedInputText = [...inputText];
    updatedInputText[index].value = text;
    setInputText(updatedInputText);
  };

  const handleRegister = async () => {
    let isValid = true;
    const newPeople = {
      name: inputText[0].value.trim(),
      specialization: inputText[1].value.trim(),
      contact: inputText[2].value.trim(),
      image: null,
    };

    const updatedInputText = inputText.map((item, index) => {
      let error = "";

      if (item.value.trim() === "") {
        error = "Field cannot be empty";
        isValid = false;
      } else if (index === 0) {
        const nameRegex = /^[a-zA-Z ]+$/;
        if (!nameRegex.test(item.value)) {
          error = "Name should contain only alphabetic characters";
          isValid = false;
        }
      } else if (index === 2) {
        const contactNumberRegex = /^\d{10}$/;
        if (!contactNumberRegex.test(item.value)) {
          error = "Contact number should contain exactly 10 digits";
          isValid = false;
        }
      }

      return { ...item, error };
    });

    setInputText(updatedInputText);

    if (!isValid) {
      return;
    }

     dispatch(PeopleAdd(newPeople));
     console.log("newPeople",newPeople);
     ShowMessage("Data Added Successfully")
      navigation.navigate('People');

    // try {
    //   const storedData = await AsyncStorage.getItem('peopleData');
    //   console.log("storedData",storedData);
    //   let parsedData = storedData ? JSON.parse(storedData) : [];
    //   parsedData.push(newPeople);

    //   console.log("parsedData",parsedData);
    //   await AsyncStorage.setItem('peopleData', JSON.stringify(parsedData));
    //   ShowMessage("Data Added Successfully")
    //   navigation.navigate('People');
    // } catch (error) {
    //   console.error('Error saving people data:', error);
    // }
  };

  return (
    <View style={styles.container}>
      {inputText.map((item, index) => (
        <View style={styles.textInputStyle} key={index}>
          <TextInput
            label={item.label}
            placeholder={item.placeholder}
            onChangeText={(text) => handleInputChange(text, index)}
            value={item.value}
            error={item.error}
            keyboardType={item.keyboardType || 'default'}
            maxLength={item.maxLength}
          />
          <Text style={styles.textErrorStyle}>{item.error}</Text>
        </View>
      ))}
      <View style={styles.spacer}>
        <Button mode="contained" onPress={handleRegister}>
          Register
        </Button>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  spacer: {
    marginVertical: 20,
  },
  textInputStyle: {
    marginVertical: 10,
  },
  textErrorStyle: {
    color: "red",
  },
});
