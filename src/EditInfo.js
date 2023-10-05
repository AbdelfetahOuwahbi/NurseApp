import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Image, ImageBackground, TouchableOpacity, Linking, Dimensions, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { Server } from './ServerIP';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const EditInfo = ({route, navigation}) =>{

    const [newFname, setNewFName] = useState(route.params.Fname);
    const [newLname, setNewLName] = useState(route.params.Lname);
    const [newEmail, setNewEmail] = useState(route.params.Email);
    const [newPhone, setNewPhone] = useState(route.params.Phone);
    const [newAddress, setNewAddress] = useState(route.params.Address);
    const [newGrade, setNewGrade] = useState(route.params.Grade);
    
  const ServerIP = Server;

    const {Fname, Lname, Email, Phone, Address, Grade, Token, user_id} = route.params;
    console.log("---",Fname,"---->", Lname,"---->", Email,"---->", Phone,"---->", Address,"---->", Grade,"---->", user_id,"---");
   console.log("the user's token -->", Token);

   //DECODING THE TOKEN
   const decoded = jwt_decode(Token);

   const EditInfos = () => {

    if (decoded.user_id === user_id) {
        
        try {

            fetch("http://"+ServerIP+"/DoctorApp/EditInformations.php", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: `first_name=${newFname}&last_name=${newLname}
                       &email=${newEmail}&phone=${newPhone}
                       &address=${newAddress}&grade=${newGrade}
                       &role=${decoded.role}&user_id=${decoded.user_id}`, 
            })
            .then((response) => response.text())
            .then((data) =>{
                console.log(data);
                if (data === "Informations were Updated Successfuly..") {
                    Alert.alert("Success", data);
                    navigation.navigate('UserProfile', {id : user_id, token : Token});
                } else {
                    Alert.alert("Error", data);
                }
            }
            )
            .catch((error) =>{
                console.log(error);
             });
            
        } catch (error) {
            console.log(error);
        }
    } else {
        
    }
   }
   
    return(
        <View style={{width:screenWidth, height:screenHeight}}>
            <View style={{width:screenWidth, height: screenHeight/5, backgroundColor:'yellow'}} >
                <Text style={{width:screenWidth/1.6, marginTop:screenHeight/12, marginLeft:screenWidth/40, fontSize:22, fontFamily: 'RobotoSlab-Bold'}}> Change Your Personal Informations</Text>
            </View>
            <View style={{width:screenWidth, height: screenHeight/2}}>

                <Text>First Name:</Text>
                <TextInput
                    value={newFname}
                    onChangeText={setNewFName}
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                />
                <Text>Last Name:</Text>
                <TextInput
                    value={newLname}
                    onChangeText={setNewLName}
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                />
                <Text>Email:</Text>
                <TextInput
                    value={newEmail}
                    onChangeText={setNewEmail}
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                />
                <Text>Phone:</Text>
                <TextInput
                    value={newPhone}
                    onChangeText={setNewPhone}
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                />
                <Text>Address:</Text>
                <TextInput
                    value={newAddress}
                    onChangeText={setNewAddress}
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                />
                {decoded.role === "nurse" ? (
                    <View style={{alignItems:'center'}}>
                        

<Text style={{fontSize: 20, fontWeight: 'bold'}}>Select Your Grade :</Text>
<Picker
  style={{height: screenHeight/50, width: screenWidth/2, backgroundColor: '#37C3FF', color: '#fff'}}
  selectedValue={newGrade}
  onValueChange={(itemValue) => setNewGrade(itemValue)}
>
  <Picker.Item label="Auxiliaire" value="Auxiliaire" />
  <Picker.Item label="Spécialisé" value="Spécialisé" />
  <Picker.Item label="Croissant rouge" value="Croissant rouge" />
  <Picker.Item label="Ambulancier" value="Ambulancier" />
  <Picker.Item label="Reducation" value="Reducation" />
  <Picker.Item label="Aide soignant" value="Aide soignant" />
</Picker>

                    </View>
                ) : (
                    <View></View>
                )}

            </View>
            <View style={{width:screenWidth, height:screenHeight/8,  alignItems:'center', justifyContent:'center'}}>

            <TouchableOpacity style={{ borderWidth:screenWidth/250, borderColor:'#fff', backgroundColor:'#37C3FF', borderRadius:screenWidth/20, height:screenHeight/18, width:screenWidth/1.6}} onPress={EditInfos}>
                <Text style={{textAlign:'center', marginTop:screenHeight/180, marginRight:screenWidth/10, fontSize: 22, fontFamily: 'RobotoSlab-ExtraLight', color: '#fff' }}>Submit Changes</Text>
                <Icon style={{ left: screenWidth / 2, bottom: screenHeight / 31, color: '#fff' }} size={25} name='arrow-right'></Icon>
            </TouchableOpacity>

            </View>
        </View>

    );
}

export default EditInfo