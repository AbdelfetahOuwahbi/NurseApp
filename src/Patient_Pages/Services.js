import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView, BackHandler  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

const Services = ({route, navigation}) => {
  
  const {patient_id, token} = route.params; //received data from the login page of the patient_user
  console.log(patient_id);
  console.log("the patient's token is :", token);

          //checking that the user does not go back to the login page
      

          //app services as follows
  const services = [
    { name: 'Gériatrie', image: require('./img/CoverProf2.jpg') },
    { name: 'Les handicapés', image: require('./img/CoverProf2.jpg') },
    { name: 'Patients post opératoire', image: require('./img/CoverProf2.jpg') },
    { name: 'Période de convalescent', image: require('./img/CoverProf2.jpg') },
    { name: 'Patients insuffisance rénale', image: require('./img/CoverProf2.jpg') },
    { name: 'Patients alités', image: require('./img/CoverProf2.jpg') },
    { name: 'Kinésithérapie', image: require('./img/CoverProf2.jpg') },
    { name: 'Pédiatrie', image: require('./img/CoverProf2.jpg') },
    { name: 'Les cas urgents', image: require('./img/CoverProf2.jpg') },
    { name: 'Ambulance', image: require('./img/CoverProf2.jpg') },
  ];

  const handleServicePress = (service) => {

    navigation.navigate('Grade', {patient_id: patient_id, token: token, service: service.name});
  };

  return (
    <View style={styles.container}>

<View style={{height:screenHeight/10, width:screenWidth, backgroundColor:'#0096FF', borderBottomColor:'grey', borderBottomWidth:2, bottom:screenHeight/80}}>
  <Text style={{color:'white', fontSize:35, fontWeight:'bold', left: screenWidth/30, top:screenHeight/28}}> Les Services :</Text>
  <Icon style={{left:screenWidth/1.15, bottom:screenHeight/150, color:'white'}} name="bell" onPress={() => navigation.navigate('PatientNotifs', {patient_id: patient_id, token: token})} size={22} />
</View>

<ScrollView>
{services.map((service) => (
        
        <TouchableOpacity
          key={service.name}
          style={styles.service}
          underlayColor="blue"
          onPress={() => handleServicePress(service)}
        >
          <>
            <Image source={service.image} style={styles.serviceImage} />
            <Text style={styles.serviceText}>{service.name}</Text>
          </>
        </TouchableOpacity>
      ))}
</ScrollView>

<View style={styles.footer}>
      <TouchableOpacity style={styles.icon}>
        <Icon name="home" size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name="plus" style={{borderRadius:screenHeight/30, borderColor:'white',
         borderWidth:screenWidth/180, width:screenWidth/9, height:screenWidth/9, 
         paddingLeft:screenWidth/32, paddingTop:screenWidth/40}} size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name="user-tie" onPress={() => navigation.navigate('UserProfile', {id : patient_id, token : token})} size={22} color="white" />
      </TouchableOpacity>
    </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor:'#565656',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  service: {
    borderBottomColor:'rgb(0, 247, 255)',
    borderBottomWidth:2,
    borderTopColor:'rgb(0, 247, 255)',
    borderTopWidth:2,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceImage: {
    width: screenWidth/1.2,
    height: screenHeight/4,
    marginBottom: 10,
    borderRadius:20
  },
  serviceText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
    fontSize:18
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: screenHeight/12,
    width:screenWidth,
    backgroundColor: '#0096FF',
    borderTopColor:'grey',
    borderTopWidth:2,
    top:screenHeight/82
  },

  icon: {
    alignItems: 'center',
  },

});

export default Services;
