import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Alert, ImageBackground, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import jwt_decode from 'jwt-decode';
import {Server} from '../ServerIP';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NurseNotifs =({route, navigation}) =>{

    const [patient_ids, setPatient_Ids] = useState([]);
    const [first_names, setFirstNames] = useState([]);
    const [last_names, setLastNames] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [times, setTimes] = useState([]);
    const [nbPersons, setNbPersons] = useState([]);
    const [status, setStatus] = useState([]);
    const [dates, setDates] = useState([]);

    const ServerIP = Server;

        const {nurse_id, token} = route.params;
       /* console.log("user id captured ---->",nurse_id);
        console.log("user token captured ---->",token); */

        useEffect(() => {
            (async () => { //asynchronous to wait for the request
        

            var decoded = jwt_decode(token);
            // console.log(decoded);
       
             if (decoded.user_id == nurse_id) {

            try {

                const response = await fetch("http://"+ServerIP+"/DoctorApp/getNotificationsForNurse.php",{
                    method:'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({nurse_id : nurse_id}),
                  });
                // console.log(response);
                 const data = await response.json();

                setPatient_Ids(data.patient_ids);
                 setFirstNames(data.first_name);
                 setLastNames(data.last_name);
                 setAddresses(data.address);
                 setAmounts(data.amount);
                 setTimes(data.time);
                 setNbPersons(data.nbpersons);
                 setStatus(data.status);
                 setDates(data.date);
                 
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


    return(
        <View style={{height: screenHeight, width:screenWidth}}>

<View style={{height:screenHeight/8.5, width:screenWidth, backgroundColor:'white', borderBottomWidth:2, borderBottomColor: 'grey'}}>
<Text style={{color: 'black', fontSize:20, fontWeight: 'bold',borderBottomWidth: screenWidth/100,
  borderBottomColor: 'black', top:screenHeight/20, left:screenWidth/30,
  paddingBottom: screenWidth/50, marginRight:screenWidth/2}}>Nurse Notifications :</Text>

</View>

<ScrollView>
{first_names.map((first_name, index) => (
    <TouchableOpacity
    key={index} // add key prop here
    onPress={() => navigation.navigate('NNotifDetails', {first_name: first_names[index], 
    last_name: last_names[index], address: addresses[index], amount: amounts[index],
    time: times[index], nbpersons: nbPersons[index], nurse_id: nurse_id, patient_id: patient_ids[index], token: token})}>

    <View style={{flexDirection:'column', justifyContent:'space-around', marginBottom: screenHeight/50}}>


    <View key={index} style={{backgroundColor:'#fff', top: screenHeight/80, left:screenWidth/25 , width:screenWidth/1.08, height:screenHeight/6, borderWidth:screenWidth/150, borderColor:'#00cdd5', borderRadius:screenHeight/40}}>

<View>
 <Text style={{left:screenWidth/1.4, top:screenHeight/80, fontWeight:'bold'}}><Text style={{color:'#00cdd5'}}>•</Text> {status[index]}</Text>
</View>

<View>
 <Text style={{left:screenWidth/1.8, top:screenHeight/10, borderBottomColor:'#00cdd5', borderBottomWidth:2, marginRight:screenHeight/3.5, fontWeight:'bold'}}> fait en: {dates[index]}</Text>
</View>

    <Text style={{color:'#00cdd5', fontWeight:'bold', fontSize:18, borderBottomWidth: screenWidth/150, borderBottomColor: '#00cdd5', bottom:screenHeight/25, marginRight:screenWidth/2.2, left:screenWidth/25}}>Nouvelle Commande</Text>
    <Text style={{left:screenWidth/40, bottom:screenHeight/50, fontSize:16}}>
    Patient <Text style={{fontWeight:'bold', fontSize:16}}>{first_name} {last_names[index]} </Text>
    <Text>a fait une nouvelle commande. Cliquer pour voir les details...</Text>
    </Text>
  </View>
    </View>
    </TouchableOpacity>
  
))}
  
</ScrollView>

        </View>


    );
}

export default NurseNotifs;