import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ImageBackground, BackHandler, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Server } from './ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginForm = ({ route, navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifToken, setNotifToken] = useState('');
  const ServerIP = Server;

  //making the session pesistent ...


  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        const user_data = jwt_decode(token);
        switch (user_data.role) {
          case "nurse":
            navigation.navigate('NurseHome', { nurse_id: user_data.user_id, token: token });
            break;
          case "patient":
            navigation.navigate('Services', { patient_id: user_data.user_id, token: token });
            break;
        }
      }
    };
    checkLoginStatus();
  }, [navigation]);

  //LOADING FONTS
  const [fontsLoaded] = useFonts({
    'RobotoSlab-ExtraLight': require('../assets/fonts/RobotoSlab-ExtraLight.ttf'),
    'RobotoSlab-Black': require('../assets/fonts/RobotoSlab-Black.ttf'),
    'RobotoSlab-Medium': require('../assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Light': require('../assets/fonts/RobotoSlab-Light.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }


  //preventing the user from getting back to login page after a successful login until loggin out


  const HandleSignIn = async () => {
    try {
      const response = await fetch("http://" + ServerIP + "/DoctorApp/Login.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'email': email, 'password': password }),
      });

      const data = await response.json();

      if (data.token) {
        AsyncStorage.setItem('jwtToken', data.token);

        console.log("token-->", data.token);

        const user_data = jwt_decode(data.token);
        // displaying the decoded token (email, id....)
        console.log(user_data);


        //registring the user for the notification token


        async function registerForPushNotificationsAsync() {
          let token;

          if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }

          if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
            }
            if (finalStatus !== 'granted') {
              alert('Failed to get push token for push notification!');
              return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("your notification token is :", token);
            setNotifToken(token);

            //inserting the notification token in the database for each user 

            try {
              const Notifresponse = await fetch("http://" + ServerIP + "/DoctorApp/InsertNotificationToken.php", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'email': email, 'notifToken': token, 'role': user_data.role }),
              });
              const arrived = await Notifresponse.json();
              console.log(arrived);
            } catch (error) {
              console.log(error);
            }

          } else {
            alert('Must use physical device for Push Notifications');
          }

          return token;
        }

        registerForPushNotificationsAsync();



        //Redirecting each user for the propre page
        switch (user_data.role) {
          case "nurse":           //  //  //
            navigation.navigate('NurseHome', { nurse_id: user_data.user_id, token: data.token });
            /*  setEmail('');
        setPassword(''); */
            break;
          case "patient":         //  //  //
            navigation.navigate('Services', { patient_id: user_data.user_id, token: data.token });
            /*  setEmail('');
        setPassword(''); */
            break;
        }
      } else {
        const data = "INVALID USERNAME OR PASSWORD";
        console.log(data);
        Alert.alert('Error !!', data, [{ text: 'OK', }
          ,], {
            cancelable: false,
          style: { borderRadius: 10, backgroundColor: 'lightblue' },
        });
      }



    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ height: screenHeight, width: screenWidth }}>

      <View style={{ alignItems: 'center', height: screenHeight / 3, top: screenHeight / 20 }}>
        <ImageBackground
          source={require('./SrcImg/LoginBackground.png')}
          style={{ width: screenWidth / 1.5, height: screenHeight / 3 /*to be changed*/ }}
        >
        </ImageBackground>
      </View>
      <View>
      </View>

      <View style={{ borderColor: '#37C3FF', borderWidth: screenWidth / 200, borderRadius: screenWidth / 50, marginTop: screenHeight / 20, width: screenWidth / 1.1, marginLeft: screenWidth / 20 }}>
        <View style={{ left: screenWidth / 5, flexDirection: 'column', top: screenHeight / 15 }}>
          <View style={{ justifyContent: 'center', borderColor: '#37C3FF', borderWidth: screenWidth / 250, height: screenHeight / 15, width: screenWidth / 1.3, borderRadius: screenWidth / 40, right: screenWidth / 8 }}>
            <TextInput
              style={{ left: screenWidth / 10, top: screenHeight / 100 }}
              placeholder="Enter your Email .."
              value={email}
              onChangeText={(text) => setEmail(text)}
            >
            </TextInput>
            <Icon style={{ left: screenWidth / 35, bottom: screenHeight / 55, color: 'grey', marginRight: screenWidth / 1.4 }} size={16} name='user'></Icon>
          </View>

          <View style={{ justifyContent: 'center', borderColor: '#37C3FF', borderWidth: screenWidth / 250, height: screenHeight / 15, width: screenWidth / 1.3, borderRadius: screenWidth / 40, right: screenWidth / 8, marginTop: screenHeight / 50 }}>
            <TextInput
              style={{ left: screenWidth / 10, top: screenHeight / 100 }}
              placeholder="Enter your Password .."
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            >
            </TextInput>
            <Icon style={{ left: screenWidth / 35, bottom: screenHeight / 55, color: 'grey', marginRight: screenWidth / 1.4 }} size={16} name='lock'></Icon>
          </View>

        </View>

        <View style={{ alignItems: 'center', marginTop: screenHeight / 6, bottom: screenHeight / 20 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: screenWidth / 250, borderColor: '#fff', backgroundColor: '#37C3FF', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 2.5 }}>
            <TouchableOpacity onPress={HandleSignIn}>
              <Text style={{ fontSize: 22, fontFamily: 'RobotoSlab-ExtraLight', color: '#fff' }}>Sign In </Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ alignItems: 'center', marginTop: screenHeight / 35, bottom: screenHeight / 20 }}>
          <Text style={{ fontFamily: 'RobotoSlab-Medium', color: 'grey' }}>do not have an account yet ?</Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: screenHeight / 30, bottom: screenHeight / 20 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: screenWidth / 250, borderColor: '#37C3FF', backgroundColor: '#FFF', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 2.5 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Choose')}>
              <Text style={{ fontSize: 22, fontFamily: 'RobotoSlab-ExtraLight', color: '#37C3FF' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>

  );
};

export default LoginForm;
