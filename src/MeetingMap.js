import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Server } from './ServerIP';

const MeetingMap = ({ route }) => {
  const { email } = route.params; // get user's location from props
  const [location, setLocation] = useState(null);
  const [otherUserLocation, setOtherUserLocation] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [granted, setGranted] = useState(false);
  const [distance, setDistance] = useState(null);

  const ServerIP = Server;

  useEffect(() => {
    (async () => {

      try {
        const response = await fetch("http://"+ServerIP+"/DoctorApp/getAddForMeeting.php",{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email : email}),   
        });
  
        const data = await response.json();
        console.log(data);

        //getting the user's coordinates (geocoding the address)
        const geocode = await Location.geocodeAsync(data.success);
        setOtherUserLocation(geocode);

        //setting the coordinates of the polyline between the two locations
        const polylineCoordinates = [
          { latitude: location.coords.latitude, longitude: location.coords.longitude },
          { latitude: otherUserLocation[0].latitude, longitude: otherUserLocation[0].longitude },
        ];

        setPolylineCoords(polylineCoordinates);

        // calculate distance
        const R = 6371; // Earth's radius in km
        const lat1 = location.coords.latitude;
        const lon1 = location.coords.longitude;
        const lat2 = otherUserLocation[0].latitude;
        const lon2 = otherUserLocation[0].longitude;
        const dLat = ((lat2-lat1) * Math.PI) / 180;
        const dLon = ((lon2-lon1) * Math.PI) / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        setDistance(distance);

      } catch (error) {
        console.log(error);
      }
     

      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setIsLoading(false);
        return;
      }
      setGranted(true);

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);

      } catch (e) {
        setError(e.message);

      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) {
    return (
    <View>
    <Text>{error}</Text>
    </View>
    );
    }
    
    if (isLoading) {
    return (
    <View>
    <Text>Loading locations...</Text>
    </View>
    );
    }
    
    return (
    <View style={{ flex: 1 }}>
    {location && (
    <MapView
    style={{ flex: 1 }}
    initialRegion={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    }}

    showsUserLocation={granted}
    >
    <Polyline
             coordinates={polylineCoords}
             strokeColor="#FF0000"
             strokeWidth={3}
           />
    <Marker
    coordinate={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    }}
    pinColor='blue'
    >
    <Callout>
    <Text>Your Location</Text>
    </Callout>
    </Marker>
    <Marker
    coordinate={{
    latitude: otherUserLocation[0].latitude,
    longitude: otherUserLocation[0].longitude,
    }}
    title="La localisation de l'infermier"
    >
    <Callout>
    {distance && (
    <View>
    <Text style={{fontSize:15}}>La distance approximative est : {distance.toFixed(2)}km.</Text>
    </View>
    )}
    </Callout>
    </Marker>
    </MapView>
    )}
    </View>
    );
    };
    
    export default MeetingMap;