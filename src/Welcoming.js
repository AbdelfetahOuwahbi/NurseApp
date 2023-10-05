import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, Button, AppLoading } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Welcoming = ({navigation}) => {

  const [fontsLoaded] = useFonts({
    'RobotoSlab-ExtraLight': require('../assets/fonts/RobotoSlab-ExtraLight.ttf'),
    'RobotoSlab-Black': require('../assets/fonts/RobotoSlab-Black.ttf'),
    'RobotoSlab-Medium': require('../assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Light': require('../assets/fonts/RobotoSlab-Light.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{height:screenHeight,width:screenWidth}}>

      <View style={{flex:1}}>

        <ImageBackground
          source={require('./SrcImg/HomeBackground5.jpg')}
          style={{width:screenWidth, height:screenHeight+30 /*to be changed*/}}
        
        >
        </ImageBackground>

      </View>

<View style={{flex:0.5}}>
<View style={{bottom:screenHeight/7, right:screenWidth/4}}>

<Text style={{color:'#227DF3', fontSize:40, fontFamily:'RobotoSlab-Black', left:screenWidth/3}}>W</Text>
<Text style={{bottom:screenHeight/18.5, color:'#fff', fontSize:30, fontFamily:'RobotoSlab-Medium', left:screenWidth/2.25}}>ELCOME TO </Text>
<Text style={{color:'#227DF3', fontSize:30, fontFamily:'RobotoSlab-Black', left:screenWidth/2.96, bottom:screenHeight/20}}>MyNur</Text>

</View>

<View style={{left:screenWidth/12, bottom:screenHeight/5.5}}>
<Text style={{width:screenWidth/1.2, color:'grey', fontSize:15, fontFamily:'RobotoSlab-Light',}}>We will help you get the best medical assistance that you need as fast as possible</Text>
</View>

<View style={{bottom:screenHeight/7, left:screenWidth/2, borderWidth:screenWidth/250, borderColor:'#fff', backgroundColor:'#37C3FF', borderRadius:screenWidth/20, height:screenHeight/18, width:screenWidth/2.5}}>
<TouchableOpacity onPress={()=> navigation.navigate('LoginForm')}>
  <Text style={{fontSize:22, fontFamily:'RobotoSlab-ExtraLight', marginLeft:screenWidth/18, marginTop:screenHeight/180, color:'#fff'}}>Sign In </Text> 
  <Icon style={{left:screenWidth/3.7, bottom:screenHeight/31, color:'#fff'}} size={25} name='arrow-right'></Icon>
</TouchableOpacity>
</View>


</View>
     
      <View>
        <Image
        source={require('./SrcImg/DoctorBackground2.png')}
        style={{width:screenWidth, height:screenHeight/1.5,top:screenHeight/28 /*to be changed*/ }}
        >

        </Image>
      </View>

    </View>
  


    
  );
};



export default Welcoming;
