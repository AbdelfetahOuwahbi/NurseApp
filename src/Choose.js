import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Choose = ({navigation}) => {

  const [fontsLoaded] = useFonts({
    'RobotoSlab-ExtraLight': require('../assets/fonts/RobotoSlab-ExtraLight.ttf'),
    'RobotoSlab-Black': require('../assets/fonts/RobotoSlab-Black.ttf'),
    'RobotoSlab-Medium': require('../assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Light': require('../assets/fonts/RobotoSlab-Light.ttf'),
    'RobotoSlab-Bold': require('../assets/fonts/RobotoSlab-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
   <View style={{width:screenWidth, height: screenHeight}}>
    <View style={{flex : 1}}>
      <ImageBackground
        source={require('./SrcImg/HomeBackground5.jpg')}
        style={{width:screenWidth, height:screenHeight+30 /*to be changed*/}}
            >
      </ImageBackground>
    </View>

    <View style={{marginTop: screenHeight/3.5}}>

    <View style={{height:screenHeight/4, marginLeft:screenWidth/2, bottom:screenHeight/5, width:screenWidth/2}}>
      <Text style={{color:'#fff', fontFamily:'RobotoSlab-Bold', fontSize:screenWidth/10}}>
        What Type Of User Will You be ?
      </Text>
     <Image
     source={require('./SrcImg/besideTextChoose.png')}
     style={{width:screenWidth/3, height:screenHeight/4, right:screenWidth/2.2, bottom:screenHeight/4.2 /*to be changed*/}}
     >

     </Image>


    </View>

    <View style={{bottom:screenHeight/10, marginLeft:screenWidth/1.7}}>
      <Image
        source={require('./SrcImg/doctor.png')}
        style={{width:screenWidth/3, height:screenHeight/4 /*to be changed*/}}
          >

      </Image>
    </View>

    <View style={{bottom:screenHeight/2.9, marginLeft:screenWidth/12}}>
      <Image
        source={require('./SrcImg/patient.png')}
        style={{width:screenWidth/3, height:screenHeight/4 /*to be changed*/}}
          >

      </Image>
    </View>

    </View>

    <View style={{flexDirection:'row', bottom: screenHeight/3.5}}>

    <View style={{marginLeft:screenWidth/20, alignItems:'center', justifyContent:'center', borderWidth:screenWidth/250, borderColor:'#fff', backgroundColor:'#37C3FF', borderRadius:screenWidth/20, height:screenHeight/18, width:screenWidth/2.5}}>
      <TouchableOpacity onPress={() => navigation.navigate('RegistrationFormPat')}>
        <Text style={{fontSize:22, fontFamily:'RobotoSlab-Black', color:'#fff'}}>Patient </Text> 
      </TouchableOpacity>
    </View>
    <View style={{marginLeft:screenWidth/9, alignItems:'center', justifyContent:'center', borderWidth:screenWidth/250, borderColor:'#fff', backgroundColor:'#37C3FF', borderRadius:screenWidth/20, height:screenHeight/18, width:screenWidth/2.5}}>
      <TouchableOpacity onPress={() => navigation.navigate('RegistrationFormDoc')}>
        <Text style={{fontSize:22, fontFamily:'RobotoSlab-Black', color:'#fff'}}>Doctor </Text> 
      </TouchableOpacity>
    </View>

    </View>
    

   </View>
  );
};



export default Choose;
