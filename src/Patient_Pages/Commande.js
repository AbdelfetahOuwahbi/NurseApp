import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Prof =({route, navigation}) =>{

  const {patient_id, token, service, grade} = route.params; // receiving infos from the other page 
 /* console.log("patient id is :", patient_id);
  console.log("the service he selected is :", service);
  console.log("the grade he selected is :", grade);
  console.log("the patient's token is :", token); */

  const [amount, setAmount] = useState('');
  const [time, setTime] = useState('');
  const [nbPersons, setNbPersons] = useState('');
    
    return(
        
<View style={styles.container}>



<View style={{height:screenHeight/10, width:screenWidth, bottom:screenHeight/3.62, backgroundColor:'#0096FF', borderBottomColor:'grey', borderBottomWidth:2}}>
  <Text style={{color:'white', fontSize:22, fontWeight:'bold', left: screenWidth/30, top:screenHeight/25}}> Creer votre commande :</Text>
</View>
      <TextInput
        style={styles.input}
        placeholder="Montant .."
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <TextInput
      style={styles.input}
      placeholder="Temps en heures .."
      onChangeText={text => setTime(text)}
      value={time}
    />
     <TextInput
      style={styles.input}
      placeholder="Nombre de Personnes .."
      onChangeText={text => setNbPersons(text)}
      value={nbPersons}
    />
      <TouchableOpacity style={styles.button} 
      onPress ={() => navigation.navigate('Map', {patient_id: patient_id, token: token, service: service, grade: grade, amount:amount, time: time, nbPersons: nbPersons})}>
      <Text style={styles.buttonText}>Choisisez Un Infermier</Text>
      </TouchableOpacity>


    <View style={styles.footer}>
      <TouchableOpacity style={styles.icon}>
        <Icon name="home" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name="plus" style={{ borderRadius:screenHeight/30, borderColor:'white',
         borderWidth:screenWidth/180, width:screenWidth/9, height:screenWidth/9, 
         paddingLeft:screenWidth/32, paddingTop:screenWidth/40}} size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name="user" onPress={() => navigation.navigate('UserProfile', {id : patient_id, token : token})} size={22} color="#fff" />
      </TouchableOpacity>
    </View>

      </View>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
    top:screenHeight/3.63
  },

  icon: {
    alignItems: 'center',
  },
});

export default Prof;