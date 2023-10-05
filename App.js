import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity, Linking} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Patient pages
import PatientHomedetails from './src/Patient_Pages/PatientHome';
import RegisterPatdetails from './src/Patient_Pages/RegisterPatient';
import Mapdetails from './src/Patient_Pages/Map';
import Gradedetails from './src/Patient_Pages/Grade';
import Servicesdetails from './src/Patient_Pages/Services';
import Consultdetails from './src/Patient_Pages/ConsultNurse';
import Commandedetails from './src/Patient_Pages/Commande';
import PatientNotifsdetails from './src/Patient_Pages/PNotifs';
import Accepted_Cmd_Detailsdetails from './src/Patient_Pages/Accepted_Cmd_Details';
import Refused_Cmd_Detailsdetails from './src/Patient_Pages/Refused_Cmd_Details';
import FooterDetails from './src/Patient_Pages/Footer';

//Nurse pages
import RegisterDocdetails from './src/Nurse_Pages/RegisterDoc';
import NurseNotifsdetails from './src/Nurse_Pages/NNotifs';
import NurseHomedetails from './src/Nurse_Pages/NurseHome';
import NNotifDetailsdetails from './src/Nurse_Pages/NNotifDetails';

//Both
import EditInfodetails from './src/EditInfo';
import Logindetails from './src/Login';
import Welcomingdetails from './src/Welcoming';
import Choosedetails from './src/Choose';
import UserProfiledetails from './src/UserProfile';
import Meetingdetails from './src/MeetingMap';

//test
import Picture from './src/TestPages/TestPicture';

const Stack = createNativeStackNavigator();


const MyStack = () => {
  return (
    
        <NavigationContainer>

          <Stack.Navigator initialRouteName="Welcoming">

          <Stack.Screen name="Picture" component={Picture} options={{ headerShown: false }}/>

          <Stack.Screen name="Welcoming" component={Welcomingdetails} options={{ headerShown: false }}/>
         
          <Stack.Screen name="LoginForm" component={Logindetails} options={{ headerShown: false }}/>
          
          <Stack.Screen name="Choose" component={Choosedetails} options={{ headerShown: false }}/>
          
          <Stack.Screen name="RegistrationFormDoc" component={RegisterDocdetails} options={{ headerShown: false }}/>
          
          <Stack.Screen name="RegistrationFormPat" component={RegisterPatdetails} options={{ headerShown: false }}/>

          <Stack.Screen name="UserProfile" component={UserProfiledetails} options={{ headerShown: false }}/>

          <Stack.Screen name="EditInfo" component={EditInfodetails} options={{ headerShown: false }}/>

          <Stack.Screen name="Footer" component={FooterDetails} options={{ headerShown: false }}/>

          <Stack.Screen name="PatientHome" component={PatientHomedetails} options={{ headerShown: false }}/>

          <Stack.Screen name="NurseHome" component={NurseHomedetails} options={{ headerShown: false }}/>
          
          <Stack.Screen name="Services"  component={Servicesdetails} options={{ headerShown: false }}/>

          <Stack.Screen name="Grade"  component={Gradedetails} options={{ headerShown: false }}/>

          <Stack.Screen name="Commande"  component={Commandedetails} options={{ headerShown: false }}/>

          <Stack.Screen name="Map" component={Mapdetails} options={{ headerShown: false }}/>

          <Stack.Screen name="Consult" component={Consultdetails} options={{ headerShown: false }}/>

          <Stack.Screen name="NurseNotifs" component={NurseNotifsdetails} options={{ headerShown: false }}/>
          
          <Stack.Screen name="NNotifDetails" component={NNotifDetailsdetails} options={{ headerShown: false }}/>
          
          <Stack.Screen name="Accepted_Cmd_Details" component={Accepted_Cmd_Detailsdetails} options={{ headerShown: false }}/>

          <Stack.Screen name="Refused_Cmd_Details" component={Refused_Cmd_Detailsdetails} options={{ headerShown: false }}/>
          
          <Stack.Screen name="PatientNotifs" component={PatientNotifsdetails} options={{ headerShown: false }}/>

          <Stack.Screen name="MeetingMap" component={Meetingdetails} options={{ headerShown: false }}/>
          
            </Stack.Navigator>

        </NavigationContainer>
        
      );
};

export default MyStack;

