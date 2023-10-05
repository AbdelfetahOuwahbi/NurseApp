import React, { useEffect, useState, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Notifications from 'expo-notifications';
import {Server} from '../ServerIP';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Accepted_Cmd_Details = ({route, navigation}) => {


  const{email, first_name, address} = route.params;

    console.log(first_name, email, address);
  
  
  return (
    <View style={{height:screenHeight, width:screenWidth}}>
     
     <View style={{height:screenHeight/8.5, width:screenWidth, backgroundColor:'white', borderBottomWidth:2, borderBottomColor: 'grey'}}>
<Text style={{color: 'black', fontSize:20, fontWeight: 'bold',borderBottomWidth: screenWidth/100,
  borderBottomColor: 'black', top:screenHeight/20, left:screenWidth/30,
  paddingBottom: screenWidth/50, marginRight:screenWidth/2.5}}>details of your command :</Text>

</View>

<View style={{ flexDirection:'column', justifyContent:'space-around', marginBottom: screenHeight/50}}>

    <View style={{backgroundColor:'white', top: screenHeight/20, left:screenWidth/25 , width:screenWidth/1.08, height:screenHeight/1.5, borderWidth:screenWidth/150, borderColor:'#00cdd5', borderRadius:screenHeight/40}}>
    
    <View style={{left:screenWidth/28, top:screenHeight/18}}>
    <Text style={{color:'#00BFFF', fontSize:22, fontWeight:'bold', borderBottomWidth: screenWidth/150,
  borderBottomColor: '#00BFFF',marginRight:screenWidth/11}}> acceptation details : </Text>
</View>

    <View style={{left:screenWidth/15, top:screenHeight/9, flexDirection:'column', justifyContent:'space-between'}}>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • first name : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{first_name}</Text></Text>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • email : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{email}</Text></Text>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30, width:screenWidth/1.3}}> • address : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{address}</Text></Text>
    </View>


  </View>

<View style={{width:screenWidth/1.5, left:screenWidth/14, top:screenHeight/13.3, height:screenHeight/20, backgroundColor:'lightblue', borderWidth: 2,
    borderColor: '#00FA9A',borderRadius:100/2, marginRight:screenWidth/1.66, paddingLeft: screenWidth/17}}>
<TouchableOpacity onPress={() => navigation.navigate('MeetingMap', {email : email})}>
    <Text style={{marginLeft:screenWidth/10, marginTop:screenHeight/240, color: 'black', fontSize:20, fontWeight: 'medium'}}>Go Meet Your Nurse</Text>
    <Icon style={{right:screenWidth/200, bottom:screenHeight/33}} name='handshake' size={20} color={'black'}></Icon>
</TouchableOpacity>
</View>


    </View>

    </View>
  );
};

export default Accepted_Cmd_Details;
