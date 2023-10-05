import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

const NurseHome =({route, navigation}) =>{

        const {nurse_id, token} = route.params;
        console.log("user id captured ---->",nurse_id);
        console.log("user token captured ---->",token);

        //checking that the user does not go back to the login page

    return(
        <View style={styles.container}>

        <View style={{bottom:screenHeight/2.6, height:screenHeight/12,  width:screenWidth, backgroundColor:'white', borderBottomColor:'grey', borderBottomWidth:2}}>
          <Text style={{color:'black', fontSize:20, fontWeight:'bold', left: screenWidth/30, top:screenHeight/40,borderBottomWidth: screenWidth/150,
          borderBottomColor: 'black', marginRight:screenWidth/1.6}}> Les Services :</Text>
        </View>
        

        <View>
        <Button title='go see Notifications' onPress={() => navigation.navigate('NurseNotifs', {nurse_id: nurse_id, token: token})} />
        </View>
        
        
        <View style={styles.footer}>
              <TouchableOpacity style={styles.icon}>
                <Icon name="home" size={22} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Icon name="plus" style={{ borderRadius:screenHeight/50, borderColor:'black',
                 borderWidth:screenWidth/180, width:screenWidth/12, height:screenWidth/12, 
                 paddingLeft:screenWidth/60, paddingTop:screenWidth/80,
                 shadowColor: '#000',
                 shadowOffset: { width: 0, height: 2 },
                 elevation: 5,}} size={22} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Icon name="user" onPress={() => navigation.navigate('UserProfile', {id : nurse_id, token : token})} size={22} color="#000" />
              </TouchableOpacity>
            </View>
              
            </View>

    );
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor:'#FFF',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    service: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      margin: 5,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    serviceImage: {
      width: screenWidth/1.2,
      height: screenHeight/4,
      marginBottom: 10,
    },
    serviceText: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    footer: {
      top:screenHeight/2.4,  
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: screenHeight/15,
      width:screenWidth,
      backgroundColor: 'white',
      borderTopWidth:2,
      borderTopColor:'grey'

    },
  
    icon: {
      alignItems: 'center',
    },
  
  });

export default NurseHome;