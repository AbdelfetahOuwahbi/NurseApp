import React, { useEffect, useState, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Notifications from 'expo-notifications';
import {Server} from '../ServerIP';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Refused_Cmd_Details = ({route, navigation}) => {

  //needed variables for sending and setting the notifications
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [value, setValue] = useState("");

    const ServerIP = Server;

    const {nurse_id, patient_id, token, first_name, last_name, address, amount, time, nbpersons} = route.params;
   // console.log(first_name, last_name, address, amount, time, nbpersons);

 //  console.log(patient_id);

  

    console.log("wooooow...he" ,value, "the command");

    const HandleUpdate = async() =>{

        try {

            const response = await fetch("http://"+ServerIP+"/DoctorApp/UpdateCommand.php",{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({answer : value, patient_id : patient_id, nurse_id : nurse_id}),
              });
            // console.log(response);
             const data = await response.json();

             console.log(data);

             if (data.success) {
               console.log("answered");
              Alert.alert( 'Voila ..', "Votre response est remis vers le patient ", [ { text: 'OK' , }
              ,], { cancelable: false,
               style: { borderRadius: 10, backgroundColor: 'lightblue' },
                
              });

              //Sending notification to the Patient

              async function schedulePushNotification() {
                await fetch('https://exp.host/--/api/v2/push/send', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    to: `${data.NotifToken}`,
                    title: "A doctor Has Asnwered !! 📬",
                    body: `A doctor has ${value} your order`,
                    data: { data: 'Go there!!' },
                  }),
                });
                console.log("goood notification sending..");
              
                notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                  setNotification(notification);
                });
              
              //after the notification is pressed it shows this in ther console
                responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                  console.log(response);
                });
              
                return () => {
                  Notifications.removeNotificationSubscription(notificationListener.current);
                  Notifications.removeNotificationSubscription(responseListener.current);
                };
              }
              
              schedulePushNotification();

             navigation.navigate('NurseNotifs', {nurse_id: nurse_id, token: token});

             }else if(data.error) {

              Alert.alert( 'Ooops !!', "Une erreur est sevenue , réessayer ultérieurement ", [ { text: 'OK' , }
              ,], { cancelable: false,
               style: { borderRadius: 10, backgroundColor: 'lightblue' },
                
              });

             }
            
        } catch (error) {
            console.log(error);
        }

        
    };

    useEffect(() => {
      if (value === 'validated' || value === 'refused') {
        HandleUpdate();
      }
    }, [value]);
    
  
  return (
    <View style={{height:screenHeight, width:screenWidth}}>
     
     <View style={{height:screenHeight/8.5, width:screenWidth, backgroundColor:'white', borderBottomWidth:2, borderBottomColor: 'grey'}}>
<Text style={{color: 'black', fontSize:20, fontWeight: 'bold',borderBottomWidth: screenWidth/100,
  borderBottomColor: 'black', top:screenHeight/20, left:screenWidth/30,
  paddingBottom: screenWidth/50, marginRight:screenWidth/2.5}}>details de Notification :</Text>

</View>

<View style={{ flexDirection:'column', justifyContent:'space-around', marginBottom: screenHeight/50}}>

    <View style={{backgroundColor:'white', top: screenHeight/20, left:screenWidth/25 , width:screenWidth/1.08, height:screenHeight/1.5, borderWidth:screenWidth/150, borderColor:'#00cdd5', borderRadius:screenHeight/40}}>
    
    <View style={{left:screenWidth/28, top:screenHeight/18}}>
    <Text style={{color:'#00BFFF', fontSize:22, fontWeight:'bold', borderBottomWidth: screenWidth/150,
  borderBottomColor: '#00BFFF',marginRight:screenWidth/11}}> Voici les details du commande : </Text>
</View>

    <View style={{left:screenWidth/15, top:screenHeight/9, flexDirection:'column', justifyContent:'space-between'}}>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • Nom : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{first_name}</Text></Text>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • Prenom : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{last_name}</Text></Text>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • adresse : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{address}</Text></Text>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • Montant qu'il va payer : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{amount} DH</Text></Text>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • temps choisi : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{time} Heures</Text></Text>
    <Text style={{color:'#87CEFA', fontSize:20, fontWeight:'bold', marginBottom: 30}}> • nombre de personnes : <Text style={{color:'black', fontSize:18, fontWeight:'500'}}>{nbpersons} Prs</Text></Text> 
    </View>


  </View>

<View style={{left:screenWidth/1.9, top:screenHeight/8, height:screenHeight/20, backgroundColor:'#DC143C', borderWidth: 2,
    borderColor: '#DC143C',borderRadius:100/2, marginRight:screenWidth/1.66, paddingLeft: screenWidth/17}}>
<TouchableOpacity onPress={() => setValue('refused')}>
    <Text style={{marginLeft:screenWidth/10, marginTop:screenHeight/240, color: 'black', fontSize:20, fontWeight: 'medium'}}>Refuse</Text>
    <Icon style={{right:screenWidth/200, bottom:screenHeight/33}} name='handshake-slash' size={20} color={'black'}></Icon>
</TouchableOpacity>
</View>

<View style={{left:screenWidth/14, top:screenHeight/13.3, height:screenHeight/20, backgroundColor:'#00FA9A', borderWidth: 2,
    borderColor: '#00FA9A',borderRadius:100/2, marginRight:screenWidth/1.66, paddingLeft: screenWidth/17}}>
<TouchableOpacity onPress={() => setValue('validated')}>
    <Text style={{marginLeft:screenWidth/10, marginTop:screenHeight/240, color: 'black', fontSize:20, fontWeight: 'medium'}}>Validate</Text>
    <Icon style={{right:screenWidth/200, bottom:screenHeight/33}} name='handshake' size={20} color={'black'}></Icon>
</TouchableOpacity>
</View>


    </View>

    </View>
  );
};

export default Refused_Cmd_Details;
