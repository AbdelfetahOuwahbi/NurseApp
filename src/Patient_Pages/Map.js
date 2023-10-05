import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button, Platform, Alert, } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Callout, Marker } from 'react-native-maps';
import jwt_decode from 'jwt-decode';
import {Server} from '../ServerIP';

// The Mapping functionality 

const MapScreen = ({route, navigation}) => {

  //Setting the variables

const [location, setLocation] = useState(null);
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [granted, setGranted] = useState(false);
const [geocodes, setGeocodes] = useState([]);
const [ids, setIds] = useState([]);

const ServerIP = Server;

const{patient_id, token, service, grade, amount, time, nbPersons} = route.params;

/* console.log("patient id is :", patient_id);
  console.log("the service he selected is :", service);
  console.log("the grade he selected is :", grade);
  //commande infos : well received
  console.log("the amount to pay is :", amount, "DH");
  console.log("the time is :", time, "h");
  console.log("the number of persons is :", nbPersons, "persons"); 
    console.log("the patient's token is :", token); */

//The method that gets , the current location of the user (Patient) 

useEffect(() => {(async () => { //asynchronous to wait for the request

      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync(); // asking for permission to access location
      
      // testing if the permission is granted

      if (status !== 'granted') {
        setError('Permission to access location was denied');
        console.log(error);
        setIsLoading(false);
        return;
      }

      setGranted(true); // The permission now is Granted


      try {
        let location = await Location.getCurrentPositionAsync({}); //Getting the current location of the user (Patient)
        setLocation(location);
        

        //code that gets the nurse's location on demande, and display it to the user 
        const getGeocodes = async () => {

          var decoded = jwt_decode(token);
     // console.log(decoded);

      if (decoded.user_id == patient_id) {
      
          try {
            const response = await fetch("http://"+ServerIP+"/DoctorApp/getAddresses.php",{
              method:'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({grade : grade}),
            });
            const ids = [];
        const geocodes = [];

        const data = await response.json();

        const addresses = data.map((item) => item.address);
        const id = data.map((item) => item.nurse_id);
      
        if (addresses == "" || id == "") {
          console.log("Pas d'addresses trouveés!!!");
          Alert.alert( 'Resultat nul !!', "Pas d'addresses trouveés , Refaire votre choix", [ { text: 'OK' , }
                        ,], { cancelable: false,
                         style: { borderRadius: 10, backgroundColor: 'lightblue' },
                          
                        });
        }
        else{
        console.log("from backend---->",id);
        console.log("from backend---->",addresses);

        for (let i = 0; i < addresses.length; i++) {
          const geocode = await Location.geocodeAsync(addresses[i]);
          geocodes.push(geocode[0]);
          ids.push(id[i]);
          
        }
        setGeocodes(geocodes);
        setIds(ids);

        console.log("stored in array---->",ids);
        console.log("stored in array---->",geocodes);
        }
          
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
    

        };
        getGeocodes();
                              

      } catch (e) { // catching the error if happens to be..

        setError(e.message);

      } finally { 
        setIsLoading(false); // disabling the loading when the oeration ends 
      }

      
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
    
      {
        error ? ( //if the location is not granted than we'll show a Map with these coordinates (Casablanca)
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 33.589886,
            longitude: -7.603869,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )
       : isLoading ? (  //if the permission is granted than well display the current location 
        <Text style={{top:400, left:110, fontSize:20, fontWeight:'bold' }}>Loading Locations...</Text>
      ) : (
        <MapView
         style={{ flex: 1 }}
          initialRegion={{
            latitude: granted? location ?.coords.latitude : 33.589886 ,
            longitude: granted? location ?.coords.longitude : -7.603869,
            latitudeDelta: 0.05 ,
            longitudeDelta: 0.05 ,
          }}
          showsUserLocation={granted}
        >
            

<Marker

coordinate={{ latitude: granted? location ?.coords.latitude : 33.589886 ,
            longitude: granted? location ?.coords.longitude : -7.603869,
            }}

pinColor='blue'
>

<Callout>
 <Text> Hi, I'm here</Text>
</Callout>

</Marker>
  
  {geocodes.map((geocode, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: geocode.latitude,
              longitude: geocode.longitude,
            }}
            pinColor="purple"
            onPress={() => navigation.navigate('Consult', 
            {nurse_id: ids[index], patient_id: patient_id, token: token, service: service, grade: grade, amount: amount, time: time, nbPersons:nbPersons})}
          >

          </Marker>
        ))}



        </MapView>

      )
      }

    </View>
    
  );
};

export default MapScreen;