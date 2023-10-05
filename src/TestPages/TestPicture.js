import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Button, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Picture() {

  //Profile picture variable

  const [chosepicture, setChosePicture] = useState(null);
  const [getpicture, setGetPicture] = useState(null)

//selecting the image 

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

//  console.log(result);

  if (!result.canceled) {
    console.log(result.assets[0].uri)
    setChosePicture(result.assets[0].uri);
  }
  const uri = result.assets[0].uri;
  const fileExtension = uri.split('.').pop();
  console.log("file extension is : ",fileExtension);
  const formData = new FormData();
  formData.append('Profileimage', {
    uri,
    type: `image/${fileExtension}`,
    name: `image.${fileExtension}`,
  });

  try {
    const response = await fetch('http://192.168.15.108/DoctorApp/ProfilePicture.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  //  console.log(response);
    const data = await response.text();
    console.log(data);
    if (response.ok) {
      console.log("The response is an OK flag");
    } else {
      console.log('Error', 'Failed to upload image');
    }
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
  fetch('http://192.168.15.108/DoctorApp/getProfilePicture.php',{
    method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
  })
  .then((response) => response.text())
  .then((imagePath) => {
    console.log(imagePath);
    //setGetPicture(imagePath);
  })
  .catch((error) => {
    console.error(error);
  });
  },[]);
  
};

  return (
    <View style={{width:screenWidth, height:screenHeight}}>
      <View style={{marginTop:screenHeight/3, width:screenWidth/3, marginLeft:screenWidth/3}}>

     <Button
     title='Upload Image'
     onPress={pickImage}
     />
      </View>
      
       {chosepicture &&
        <Image source={{ uri: chosepicture }} style={{ width: 200, height: 200 }}
         />}
    
    </View>
  );
};

