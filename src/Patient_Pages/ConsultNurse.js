import React, {useState, useRef, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import jwt_decode from 'jwt-decode';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {Server} from '../ServerIP';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Consult =({route, navigation}) =>{

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
    
  const ServerIP = Server;

    const {nurse_id, patient_id, token, service, grade, amount, time, nbPersons} = route.params;
  //  console.log("patient id is :", patient_id);
  /*  console.log("the service he selected is :", service);
    console.log("the grade he selected is :", grade);
    //commande infos : well received
    console.log("the amount to pay is :", amount, "DH");
    console.log("the time is :", time, "h");
    console.log("the number of persons is :", nbPersons, "persons");
      console.log("the patient's token is :", token);  */

      const CreateCommand = () => {


        const decoded = jwt_decode(token);
        if (decoded.user_id == patient_id) {

          try {

            fetch("http://"+ServerIP+"/DoctorApp/CreateCommand.php", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `nurse_id=${nurse_id}
                     &patient_id=${patient_id}
                     &service=${service}
                     &grade=${grade}
                     &amount=${amount}
                     &time=${time}
                     &nbPersons=${nbPersons}`,
            },
      
            )
              .then((response) => response.text())
              .then((data) => {
                console.log(data);

                if (data == "This command is already created!!") {

                  Alert.alert( 'infraction !!', "La commande est déja crée", [ { text: 'OK' , }
                  ,], { cancelable: false,
                   style: { borderRadius: 50, Color: 'red' },
                    
                  });
                 


                }else if(data.startsWith('Command Created Successfully..')){

               // Split the response string to extract the message and the Notif_Token value
               const [message, notifToken] = data.split('|');
               console.log(message);
               console.log(notifToken);

               Alert.alert( 'Voila..', "La commande est crée avec succès", [ { text: 'OK' , }
               ,], { cancelable: false,
                style: { borderRadius: 20, backgroundColor: 'green' },
                 
               });

               //Sending notification to the nurse

      async function schedulePushNotification() {
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: `${notifToken}`,
            title: "You Have a New Order!! 📬",
            body: 'A Patient Has made a New Order',
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
                  
                }

              })

              .catch((error) =>{
                 console.log(error);
              });

          } catch (error) {
          console.error(error);
          }

        }else{
          console.log("Ooops!!!");
          Alert.alert( 'Ooops !!', "Vous n'étiez pas autorisé !!!", [ { text: 'OK' , }
                        ,], { cancelable: false,
                         style: { borderRadius: 10, backgroundColor: 'lightblue' },
                          
                        });
        }

      };

    return( 
<View style={{top: 400, alignItems:'center',}}>
<Text style={{color:'black', fontSize:18}}>This is Consulting Page ,Doctor's ID : {nurse_id}</Text>

<View>
<Button title='Créer une commande'
  onPress={() => CreateCommand()}
/>
</View>

</View>

    );
}

export default Consult;