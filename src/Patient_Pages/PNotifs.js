import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Alert, ImageBackground, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import jwt_decode from 'jwt-decode';
import {Server} from '../ServerIP';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PatientNotifs =({route, navigation}) =>{

    const [first_names, setFirstNames] = useState([]);
    const [last_names, setLastNames] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [emails, setEmails] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [times, setTimes] = useState([]);
    const [nbPersons, setNbPersons] = useState([]);
    const [status, setStatus] = useState([]);
    const [dates, setDates] = useState([]);

    const ServerIP = Server;

        const {patient_id, token} = route.params;
        console.log("user id captured ---->",patient_id);
       // console.log("user token captured ---->",token); 

        useEffect(() => {
            (async () => { //asynchronous to wait for the request
        

            var decoded = jwt_decode(token);
             console.log("decoded id-->",decoded.user_id);
       
             if (decoded.user_id == patient_id) {

            try {

                const response = await fetch("http://"+ServerIP+"/DoctorApp/getNotificationsForPatient.php",{
                    method:'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({patient_id : patient_id}),
                  });
                // console.log(response);
                 const data = await response.json();

                 console.log(data);
                setFirstNames(data.first_name);
                 setLastNames(data.last_name);
                 setAddresses(data.address);
                 setEmails(data.email);
                 setAmounts(data.amount);
                 setTimes(data.time);
                 setNbPersons(data.nbpersons);
                 setStatus(data.status);
                 setDates(data.date); 
                 
                 console.log("emails from backend-->",emails);
                  /*  console.log("addresses from backend-->",addresses);
                    console.log("amount from backend-->",amounts);
                    console.log("time from backend-->",times);
                    console.log("number of persons from backend-->",nbPersons);
                    console.log("patient_ids from backend-->",patient_ids); */

            } catch (error) {
                console.log(error);
            }
        }else{
            console.log("Ooops!!!");
              Alert.alert( 'Ooops !!', "Vous n'étiez pas autorisé !!!", [ { text: 'OK' , }
                            ,], { cancelable: false,
                             style: { borderRadius: 10, backgroundColor: 'lightblue' },
                              
                            });
        }

    })();
}, []);
console.log("emails -->",emails);

    return(
        <View style={{height: screenHeight, width:screenWidth}}>

<View style={{height:screenHeight/8.5, width:screenWidth, backgroundColor:'white', borderBottomWidth:2, borderBottomColor: 'grey'}}>
<Text style={{color: 'black', fontSize:20, fontWeight: 'bold',borderBottomWidth: screenWidth/100,
  borderBottomColor: 'black', top:screenHeight/20, left:screenWidth/30,
  paddingBottom: screenWidth/50, marginRight:screenWidth/2.3}}>Patient Notifications :</Text>

</View>

<ScrollView>
{first_names.map((first_name, index) => (
    <TouchableOpacity
    key={index} // add key prop here
    onPress={() => {
      if (status[index] === "validated") {
        navigation.navigate('Accepted_Cmd_Details', {email : emails[index], first_name : first_names[index], address : addresses[index]});
      }else{navigation.navigate('Refused_Cmd_Details');}
    }}
    >

    <View style={{flexDirection:'column', justifyContent:'space-around', marginBottom: screenHeight/50}}>


    <View key={index} style={{backgroundColor:'#fff', top: screenHeight/80, left:screenWidth/25 , width:screenWidth/1.08, height:screenHeight/6, borderWidth:screenWidth/150, borderColor:'#00cdd5', borderRadius:screenHeight/40}}>


<View>
 <Text style={{left:screenWidth/2.2, top:screenHeight/8.5, borderBottomColor:'#00cdd5', borderBottomWidth:2, marginRight:screenHeight/4.1, fontWeight:'bold'}}> repondu en: {dates[index]}</Text>
</View>

    <Text style={{color:'#00cdd5', fontWeight:'bold', fontSize:18, borderBottomWidth: screenWidth/150, borderBottomColor: '#00cdd5', bottom:screenHeight/48, marginRight:screenWidth/2.8, left:screenWidth/25}}> Un Infermier a repondu !!</Text>
    <Text style={{left:screenWidth/40, bottom:screenHeight/150, fontSize:16}}>
    L'infermier <Text style={{fontWeight:'bold', fontSize:16}}>{first_name} {last_names[index]} </Text>
    <Text>a <Text style={{fontWeight:'bold', color:'green'}}>{status[index]}</Text> Votre Commande</Text>
    </Text>
  </View>
    </View>
    </TouchableOpacity>
  
))}
  
</ScrollView>

        </View>


    );
}

export default PatientNotifs;