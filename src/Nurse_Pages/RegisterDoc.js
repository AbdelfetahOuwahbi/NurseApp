import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ImageBackground, SafeAreaView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {Server} from '../ServerIP';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RegistrationFormDoc = ({navigation}) => {


  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [create_password, setCreatepassword] = useState('');
  const [confirm_password, setConfirmpassword] = useState('');
  const [address, setAddress] = useState('');
  const [grade, setGrades] = useState('Auxiliaire');

  const ServerIP = Server;

 /*loading fonts
    const [fontsLoaded] = useFonts({
      'RobotoSlab-ExtraLight': require('C:/Users/AbdelFetah/Desktop/MyDoc/assets/fonts/RobotoSlab-ExtraLight.ttf'),
      'RobotoSlab-Black': require('C:/Users/AbdelFetah/Desktop/MyDoc/assets/fonts/RobotoSlab-Black.ttf'),
      'RobotoSlab-Medium': require('C:/Users/AbdelFetah/Desktop/MyDoc/assets/fonts/RobotoSlab-Medium.ttf'),
      'RobotoSlab-Light': require('C:/Users/AbdelFetah/Desktop/MyDoc/assets/fonts/RobotoSlab-Light.ttf'),
      'RobotoSlab-Bold': require('C:/Users/AbdelFetah/Desktop/MyDoc/assets/fonts/RobotoSlab-Bold.ttf')
    });
  
    if (!fontsLoaded) {
      return null;
    }
*/


  const informations = [

    {
      Credentials: (
        
        <View style={{justifyContent:'center', alignItems:'center', marginTop:screenHeight/3.5}}>
          <View style={{alignItems:'center', justifyContent:'center', borderColor:'#37C3FF', borderWidth:screenHeight/600, height:screenHeight/15, width:screenWidth/1.2, borderRadius:screenHeight/35}}>
          <TextInput
            style={{marginRight:screenWidth/3}}
            placeholder="Enter Your First name"
            value={first_name}
            onChangeText={(text) => setFirstname(text)}
          />
          </View>
          <View style={{alignItems:'center', justifyContent:'center', borderColor:'#37C3FF', borderWidth:screenHeight/600, height:screenHeight/15, width:screenWidth/1.2, marginTop:screenHeight/30, borderRadius:screenHeight/35}}>
          <TextInput
            style={{marginRight:screenWidth/3}}
            placeholder="Enter Your Last name"
            value={last_name}
            onChangeText={(text) => setLastname(text)}
          />
          </View>
          
        </View>
      ),
    },

    {
      Credentials: (
        <View style={{justifyContent:'center', alignItems:'center', marginTop:screenHeight/3.5}}>
          <View style={{alignItems:'center', justifyContent:'center', borderColor:'#37C3FF', borderWidth:screenHeight/600, height:screenHeight/15, width:screenWidth/1.2, borderRadius:screenHeight/35}}>
          <TextInput
            style={{marginRight:screenWidth/3}}
            placeholder="Enter Your Email Here"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          </View>
          <View style={{alignItems:'center', justifyContent:'center', borderColor:'#37C3FF', borderWidth:screenHeight/600, height:screenHeight/15, width:screenWidth/1.2, marginTop:screenHeight/30, borderRadius:screenHeight/35}}>
          <TextInput
            style={{marginRight:screenWidth/10}}
            placeholder="Enter Your Phone Here ..+212 020.."
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
         </View>
          
      </View>
      ),
    },

    {
      Credentials: (
        <View style={{justifyContent:'center', alignItems:'center', marginTop:screenHeight/3.5}}>
          <View style={{alignItems:'center', justifyContent:'center', borderColor:'#37C3FF', borderWidth:screenHeight/600, height:screenHeight/15, width:screenWidth/1.2, borderRadius:screenHeight/35}}>
          <TextInput
        style={{marginRight:screenWidth/5}}
        placeholder="Enter Your Exact Address here"
        value={address}
        onChangeText={(text) => setAddress(text)}
        />
         </View>

          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Select Your Grade :</Text>
          <Picker
            style={{height: screenHeight/50, width: screenWidth/2, backgroundColor: '#37C3FF', color: '#fff'}}
            selectedValue={grade}
            onValueChange={(itemValue) => setGrades(itemValue)}
          >
            <Picker.Item label="Auxiliaire" value="Auxiliaire" />
            <Picker.Item label="Spécialisé" value="Spécialisé" />
            <Picker.Item label="Croissant rouge" value="Croissant rouge" />
            <Picker.Item label="Ambulancier" value="Ambulancier" />
            <Picker.Item label="Reducation" value="Reducation" />
            <Picker.Item label="Aide soignant" value="Aide soignant" />
          </Picker>
        </View>
      ),
    },

    {
      Credentials: (
        <View style={{justifyContent:'center', alignItems:'center', marginTop:screenHeight/3.5}}>
          <View style={{alignItems:'center', justifyContent:'center', borderColor:'#37C3FF', borderWidth:screenHeight/600, height:screenHeight/15, width:screenWidth/1.2, borderRadius:screenHeight/35}}>
          <TextInput
            style={{marginRight:screenWidth/6}}
            secureTextEntry={true}
            placeholder="Create a strong password"
            onChangeText={(text) => setCreatepassword(text)}
            value={create_password}
          />
          </View>
          <View style={{alignItems:'center', justifyContent:'center', borderColor:'#37C3FF', borderWidth:screenHeight/600, height:screenHeight/15, marginTop:screenHeight/30, width:screenWidth/1.2, borderRadius:screenHeight/35}}>
          <TextInput
            style={{marginRight:screenWidth/4}}
            secureTextEntry={true}
            placeholder="Confirm the password"
            onChangeText={(text) => setConfirmpassword(text)}
            value={confirm_password}
          />
        </View>
      </View>
      ),
    },
    
  ];


const [currentinfosIndex, setCurrentinfosIndex] = useState(0);

//handling the first_name

const handlePreviousSlide = () => {
  if (currentinfosIndex > 0) {
    setCurrentinfosIndex(currentinfosIndex - 1);
  }
};

const handleNextSlide = () => {
  if (currentinfosIndex <= informations.length - 1) {
    setCurrentinfosIndex(currentinfosIndex + 1);
  }
};

  const handleSignup = async() => {

if (!first_name || !last_name || !email || !phone || !grade || !create_password || !confirm_password || !address) {
      Alert.alert(
        'Error !!',
        'All Fields Required',
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: false,
          style: { borderRadius: 10, backgroundColor: 'lightblue' },
        }
      );
    } else {
      fetch("http://"+ServerIP+"/DoctorApp/registerDoc.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `first_name=${first_name}
               &last_name=${last_name}
               &email=${email}
               &phone=${phone}
               &grade=${grade}
               &create_password=${create_password}
               &confirm_password=${confirm_password}
               &address=${address}`,
      },

      )
        .then((response) => response.text())
        .then((data) => {
          console.log(data);

          if (data != "Registration made successfuly") {
            Alert.alert(
              'Error !!',
              data,
              [
                {
                  text: 'OK',
                },
              ],
              {
                cancelable: false,
                style: { borderRadius: 10, backgroundColor: 'lightblue' },
              }
            );
          //  callNotifFunction();
          }
          else if (data == "Registration made successfuly") {
            navigation.navigate('LoginForm');

            setFirstname(''); setLastname(''); setEmail(''); setPhone(''); setGrades('Auxiliaire'); 
            setCreatepassword(''); setConfirmpassword(''); setAddress('');

          }
        
        })

       .catch((error) =>{
          console.log(error);
       });
    }
  };

  return (
    <LinearGradient colors={['#37C3FF', '#42E695']} style={{width:screenWidth, height: screenHeight+30}}>  
      
      <Image
      source={require('./img/docRegister.png')}
      style={{width:screenWidth/2.5, height:screenHeight/4, top:screenHeight/7.6, marginLeft:screenWidth/3.5/*to be changed*/}}
      />
      
      <View style={{borderColor:'#37C3FF', backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:screenWidth/20, borderWidth:screenWidth/100, height:screenHeight/2, width:screenWidth/1.1, top:screenHeight/8, marginLeft:screenWidth/20}}>
<SafeAreaView style={{alignItems:'center', justifyContent:'center', bottom:screenHeight/6.2}}>

<Icon name="user-plus" style={{top:screenHeight/4, color:'#37C3FF'}} size={35} />      
      {informations[currentinfosIndex].Credentials}

      <View style={{alignItems:'center', flexDirection:'row', top:screenHeight/25}}>
        <TouchableOpacity style={[{left:screenWidth/9, borderRadius:screenHeight/30, borderColor:'#37C3FF', borderWidth:screenWidth/200, height:screenHeight/16, width:screenWidth/2.5, backgroundColor: currentinfosIndex === 0 ? '#fff' : '#37C3FF' }]} onPress={handlePreviousSlide}>
          <Text style={{textAlign:'center', marginTop:screenHeight/60, color: currentinfosIndex === 0 ? 'black' : '#fff'}}>Previous</Text>
        </TouchableOpacity>
        {currentinfosIndex === 3 ? (
  <TouchableOpacity style={[{right:screenWidth/9, borderRadius:screenHeight/30, borderColor:'#37C3FF', borderWidth:screenWidth/200, height:screenHeight/16, width:screenWidth/2.5, marginLeft:screenWidth/4, backgroundColor: currentinfosIndex === informations.length - 1 ? '#fff' : '#37C3FF' }]} onPress={handleSignup}>
    <Text style={{textAlign:'center', marginTop:screenHeight/60, color: currentinfosIndex === 3 ? 'black' : '#fff'}}>Sign Up</Text>
  </TouchableOpacity>
) : (
  <TouchableOpacity style={[{right:screenWidth/9, borderRadius:screenHeight/30, borderColor:'#37C3FF', borderWidth:screenWidth/200, height:screenHeight/16, width:screenWidth/2.5, marginLeft:screenWidth/4, backgroundColor: currentinfosIndex === informations.length - 1 ? '#fff' : '#37C3FF' }]} onPress={handleNextSlide}>
    <Text style={{textAlign:'center', marginTop:screenHeight/60, color:'#fff'}}>Next</Text>
  </TouchableOpacity>
)}
      </View>
    </SafeAreaView>
    </View>
    </LinearGradient>
    
  );
};

export default RegistrationFormDoc;
