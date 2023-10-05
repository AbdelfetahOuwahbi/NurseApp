import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, Text, View, Button, Image, ImageBackground, TouchableOpacity, Dimensions, Alert, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { Server } from './ServerIP';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const UserProfile = ({ route, navigation }) => {

  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('');
  const [address, setAddress] = useState('');
  const [profpicture, setProfilePicture] = useState(null);
  const [coverpicture, setCoverPicture] = useState(null);

  const [currentimage, setCurrentImage] = useState(""); // FILTER BY THE CURRENT CLICKED IMAGE
  const [showCard, setShowCard] = useState(false); // CARD THAT ALLOWS THE USER TO UPLOAD OR VIEW A PICTURE
  const fadeAnim = useRef(new Animated.Value(0)).current; // OPACITY ANIMATION FOR THE CARD
  const [showPicture, setShowPicture] = useState(false); // WHEN THE USER PRESSES VIEW PICTURE

  const ServerIP = Server;

  //Profile picture variable

  const [chosepicture, setChosePicture] = useState(null);


  //GIVING THE USER THE HAND TO SELECT THE PROFILE IMAGE FROM THE PHONE'S STORAGE 

  const pickProfImage = async () => {

    try {

      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      //  console.log(result);

      if (!result.canceled) {
        console.log(result.assets[0].uri)
        setChosePicture(result.assets[0].uri);
      } else {
        console.log("user cahnged his mind !!");
        Alert.alert("Canceled", "You did not choose any picture !!");

      }
      const uri = result.assets[0].uri;
      const fileExtension = uri.split('.').pop();
      console.log("file extension is : ", fileExtension);

      //CREATING THE FORM DATA

      const formData1 = new FormData();
      const timestamp = Date.now();
      // console.log(timestamp);
      formData1.append('Profileimage', {
        uri,
        type: `image/${fileExtension}`,
        name: `image_${timestamp}.${fileExtension}`,
      });

      // Adding the role to FormData to filter the user
      formData1.append('role', role)
      formData1.append('user_id', user_id)

      // SENDING THE PROFILE IMAGE TO THE BE UPLOADED ON THE SERVER
      try {
        const ProfPicresponse = await fetch('http://' + ServerIP + '/DoctorApp/ProfilePicture.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData1,
        });
        //  console.log(ProfPicresponse);
        const ProfPicdata = await ProfPicresponse.text();
        //  console.log(ProfPicdata);
        if (ProfPicresponse.ok) {
          console.log("The response is an OK flag for Profile");
        } else {
          console.log('Error', 'Failed to upload Profile image');
        }
      } catch (error) {
        console.log(error);
      }

    } catch (error) {
      console.log(error);
    }

  };


  //GIVING THE USER THE HAND TO SELECT THE COVER IMAGE FROM THE PHONE'S STORAGE 

  const pickCovImage = async () => {

    try {

      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      //  console.log(result);

      if (!result.canceled) {
        console.log(result.assets[0].uri);
        setChosePicture(result.assets[0].uri);
      } else {
        console.log("user changed his mind !!");
        Alert.alert("Canceled", "You did not choose any picture !!");

      }
      const uri = result.assets[0].uri;
      const fileExtension = uri.split('.').pop();
      console.log("file extension is : ", fileExtension);

      //CREATING THE FORM DATA

      const formData2 = new FormData();
      const timestamp = Date.now();
      // console.log(timestamp);
      formData2.append('Coverimage', {
        uri,
        type: `image/${fileExtension}`,
        name: `image_${timestamp}.${fileExtension}`,
      });

      // Adding the role to FormData to filter the user
      formData2.append('role', role)
      formData2.append('user_id', user_id)

      // SENDING THE COVER IMAGE TO THE BE UPLOADED ON THE SERVER

      try {
        const CvrPicresponse = await fetch('http://' + ServerIP + '/DoctorApp/CoverPicture.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData2,
        });
        //  console.log(CvrPicresponse);
        const CvrPicdata = await CvrPicresponse.text();
        console.log(CvrPicdata);
        if (CvrPicresponse.ok) {
          console.log("The response is an OK flag for Profile");
        } else {
          console.log('Error', 'Failed to upload Profile image');
        }
      } catch (error) {
        console.log(error);
      }

    } catch (error) {
      console.log(error);
    }


  };

  //RECEIVED ID AND TOKEN FROM THE PAGE BEFORE

  const { id, token } = route.params;

  const decoded = jwt_decode(token);

  // console.log("the user is a --->",decoded.role);

  const role = decoded.role; // type of user extracted from token
  const user_id = decoded.user_id; // the user id extracted from token


  //handling the logout for user  //LOG OUT SECTION STARTS

  var HandleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      navigation.navigate('LoginForm'); // or navigate to the home screen
    } catch (error) {
      console.log(error);
    }
  };

  //LOG OUT SECTION ENDS


  //GETTING THE USERS'S INFORMATIONS SECTION STARTS
  useEffect(() => {
    (async () => {

      if (user_id == id) {

        try {

          const response = await fetch("http://" + ServerIP + "/DoctorApp/GetProfile.php", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: role, user_id: user_id }),
          });
          const data = await response.json();
          //  console.log(data);
          setFirst_name(data.first_name); console.log(first_name);
          setLast_name(data.last_name); console.log(last_name);
          setEmail(data.email); console.log(email);
          setPhone(data.phone); console.log(phone);
          setGrade(data.grade); console.log(grade);
          setAddress(data.address); console.log(address);
          setProfilePicture(data.Profile_Pic);
           console.log(profpicture);
          setCoverPicture(data.Cover_Pic);
           console.log(coverpicture);

        } catch (error) {
          console.log(error);
        }

      } else {

        console.log("Ooops!!!");
        Alert.alert('Ooops !!', "Vous n'étiez pas autorisé !!!", [{ text: 'OK', }
          ,], {
          cancelable: false,
          style: { borderRadius: 10, backgroundColor: 'lightblue' },

        });


      }

    })();
  }, []);

  //GETTING THE USERS'S INFORMATIONS SECTION ENDS

  //Card that allows to change or view the photo

  useEffect(() => {
    if (showCard) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [showCard, fadeAnim]);

  //LOADING FONTS
  const [fontsLoaded] = useFonts({
    'RobotoSlab-ExtraLight': require('../assets/fonts/RobotoSlab-ExtraLight.ttf'),
    'RobotoSlab-Black': require('../assets/fonts/RobotoSlab-Black.ttf'),
    'RobotoSlab-Medium': require('../assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Light': require('../assets/fonts/RobotoSlab-Light.ttf'),
    'RobotoSlab-Bold': require('../assets/fonts/RobotoSlab-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }



  //displaying the appropriate data for the appropriate user

  if (decoded.role == "nurse") {

    return (


      <View style={{ height: screenHeight, width: screenWidth }}>

        <ScrollView style={{ flex: 1 }}>

          <View style={{ height: screenHeight / 7.5, backgroundColor: 'white', width: screenWidth }}>

            <View style={{ top: screenHeight / 15, left: screenWidth / 28 }}>
              <Text style={{
                color: 'black', fontSize: 20, fontFamily: 'RobotoSlab-Bold', borderBottomWidth: screenWidth / 100,
                borderBottomColor: '#37C3FF',
                paddingBottom: screenWidth / 50, marginRight: screenWidth / 1.8
              }}>Personal Profile
              </Text>
            </View>

            <View style={{ bottom: screenHeight / 180, left: screenWidth / 28 }}>
              <Icon name='user' size={20} color={'#37C3FF'}></Icon>
            </View>

            <View style={{ top: screenHeight / 15, left: screenWidth / 8 }} >
              <TouchableOpacity onPress={() => navigation.navigate('EditInfo', { Fname: first_name, Lname: last_name, Email: email, Phone: phone, Address: address, Grade : grade, Token : token, user_id : user_id })}>
                <Text style={{
                  backgroundColor: '#37C3FF', flex: 0, color: 'white', fontSize: 20, fontFamily: 'RobotoSlab-ExtraLight', borderWidth: 2,
                  borderColor: '#37C3FF', borderRadius: 100 / 2, bottom: 50, marginRight: screenWidth / 1.5, paddingLeft: screenWidth / 25, left: screenWidth / 2
                }}>
                  <Icon name='pen' size={20} color={'white'}></Icon> Edit Info</Text>
              </TouchableOpacity>
            </View>

            <View style={{ bottom: screenWidth / 12, left: screenWidth / 2.3 }}>
              <Icon name='stethoscope' size={20} color={'#37C3FF'}></Icon>
            </View>

          </View>

          <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("CoverPic"); }}>
            {coverpicture ? (
              <ImageBackground
                source={{ uri: coverpicture }}
                style={{ flex: 0.4, height: screenHeight / 4 }}
                resizeMode={'cover'}
              >
                <View style={{ top: screenHeight / 6, left: screenWidth / 1.2 }}>
                </View>
                <View style={{ flex: 0.4, height: screenHeight / 4 }}></View>
              </ImageBackground>


            ) : (
              <ImageBackground
                style={{ flex: 0.4, height: screenHeight / 4, backgroundColor: 'lightgrey' }}
                resizeMode={'cover'}
              >
                <View style={{ top: screenHeight / 6, left: screenWidth / 1.2 }}></View>
                <View style={{ flex: 0.4, height: screenHeight / 4 }}></View>
              </ImageBackground>
            )}
          </TouchableOpacity>



          <View style={{ top: screenHeight / 90, alignItems: 'center', justifyContent: 'center', }}>
            {profpicture ?
              (<TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("ProfilePic"); }}>
                <Image
                  source={{ uri: profpicture }}
                  style={{ width: 160, height: 160, bottom: screenHeight / 8, borderRadius: 100, borderWidth: 3, borderColor: '#37C3FF' }}
                />
              </TouchableOpacity>) : (
                <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("ProfilePic"); }}>
                  <Image
                    source={require('./SrcImg/default-user-image.png')}
                    style={{ width: 160, height: 160, bottom: screenHeight / 8, borderRadius: 100, borderWidth: 3, borderColor: 'rgb(0, 247, 255)' }}
                  />
                </TouchableOpacity>
              )}


            <View style={{ bottom: screenHeight / 5, right: screenWidth / 16 }}>
            </View>

          </View>

          <View style={{ bottom: screenHeight / 10 }}>
            <Text style={{ fontFamily: 'RobotoSlab-Bold', fontSize: 20, textAlign: 'center' }}>
              {first_name} {last_name}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'RobotoSlab-Medium' }}>
              Infermier {grade}
            </Text>
          </View>


          <View style={{ right: screenWidth / 5.5, bottom: screenHeight / 18 }}>
            <Text style={{
              borderBottomColor: '#37C3FF', borderBottomWidth: 3,
              fontFamily: 'RobotoSlab-Bold', fontSize: 17, marginLeft: screenWidth / 4, marginRight: screenWidth / 3.8,
            }}>Personal Informations :
            </Text>
          </View>

          <View style={{ height: screenHeight, flex: 1, flexDirection: 'column', width: screenWidth, marginTop: screenHeight / 30 }}>

            <Icon name="envelope" style={{ left: screenWidth / 10 }} size={22} color={'#37C3FF'} />

            <Icon name="phone" style={{ top: screenWidth / 1.3, right: screenWidth / 2.7, transform: [{ rotate: '90deg' }] }} size={22} color={'#37C3FF'} />

            <Icon name="address-book" style={{ top: screenWidth / 1.65, left: screenWidth / 10 }} size={22} color={'#37C3FF'} />

            <Icon name="map-pin" style={{ top: screenWidth / 1.05, left: screenWidth / 10 }} size={22} color={'#37C3FF'} />

            <Text style={{ borderBottomColor: '#37C3FF', borderBottomWidth: 3, marginRight: screenWidth / 1.2, fontSize: 18, fontWeight: 'bold', bottom: screenWidth / 4.12, left: screenWidth / 5.5 }}>Email :</Text>

            <Text style={{ borderBottomColor: '#37C3FF', borderBottomWidth: 3, marginRight: screenWidth / 1.2, fontSize: 18, fontWeight: 'bold', top: screenHeight / 40, left: screenWidth / 5.5 }}>Phone :</Text>

            <Text style={{ borderBottomColor: '#37C3FF', borderBottomWidth: 3, marginRight: screenWidth / 1.2, fontSize: 18, fontWeight: 'bold', top: screenWidth / 2.9, left: screenWidth / 5.5 }}>Grade :</Text>

            <Text style={{ borderBottomColor: '#37C3FF', borderBottomWidth: 3, marginRight: screenWidth / 1.3, fontSize: 18, fontWeight: 'bold', top: screenWidth / 1.48, left: screenWidth / 5.5 }}>Address :</Text>

            <Text style={{ bottom: screenWidth / 3, left: screenWidth / 8, fontFamily: 'RobotoSlab-Black', color: 'grey' }}>• {email}</Text>

            <Text style={{ bottom: screenWidth / 50, left: screenWidth / 8, fontFamily: 'RobotoSlab-Black', color: 'grey' }}>• {phone}</Text>

            <Text style={{ top: screenWidth / 3.2, left: screenWidth / 8, fontFamily: 'RobotoSlab-Black', color: 'grey' }}>• {grade}</Text>
            <Text style={{ top: screenWidth / 1.5, left: screenWidth / 8, fontFamily: 'RobotoSlab-Black', color: 'grey' }}>• {address}</Text>

            <View style={{ alignItems: 'center', top: screenHeight / 2 }}>
              <TouchableOpacity onPress={HandleLogout}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#37C3FF', borderBottomWidth: 2, borderBottomColor: 'rgb(0, 247, 255)' }}>LOG OUT</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

        {showCard && currentimage == "CoverPic" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{ height: screenHeight / 8, backgroundColor: '#37C3FF', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', left: screenWidth / 21, borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={() => { setShowPicture(true); setCurrentImage("CoverPic") }}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>View Cover Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={pickCovImage}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>Upload new Cover Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

        {showCard && currentimage == "ProfilePic" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{ height: screenHeight / 8, backgroundColor: '#37C3FF', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', left: screenWidth / 21, borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={() => { setShowPicture(true); setCurrentImage("ProfilePic") }}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>View Profile Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={pickProfImage}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>Upload new Profile Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

        {showPicture && currentimage == "CoverPic" && (
          <TouchableOpacity onPress={() => { setShowPicture(false); setShowCard(false) }} style={{ position: 'absolute', height: screenHeight + 50, width: screenWidth, backgroundColor: 'black' }}>
            <Image source={{ uri: coverpicture }} style={{ height: screenHeight, width: screenWidth }} resizeMode="contain" />
          </TouchableOpacity>
        )}

        {showPicture && currentimage == "ProfilePic" && (
          <TouchableOpacity onPress={() => { setShowPicture(false); setShowCard(false) }} style={{ position: 'absolute', height: screenHeight + 50, width: screenWidth, backgroundColor: 'black' }}>
            <Image source={{ uri: profpicture }} style={{ height: screenHeight, width: screenWidth }} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>

    );

  } else {

    return (
      <View style={{ height: screenHeight, width: screenWidth }}>

        <ScrollView style={{ flex: 1 }}>

          <View style={{ height: screenHeight / 7.5, backgroundColor: 'white', width: screenWidth }}>

            <View style={{ top: screenHeight / 15, left: screenWidth / 28 }}>
              <Text style={{
                color: 'black', fontSize: 20, fontFamily: 'RobotoSlab-Bold', borderBottomWidth: screenWidth / 100,
                borderBottomColor: '#37C3FF',
                paddingBottom: screenWidth / 50, marginRight: screenWidth / 1.8
              }}>Personal Profile
              </Text>
            </View>

            <View style={{ bottom: screenHeight / 180, left: screenWidth / 28 }}>
              <Icon name='user' size={20} color={'#37C3FF'}></Icon>
            </View>

            <View style={{ top: screenHeight / 15, left: screenWidth / 8 }} >
              <TouchableOpacity onPress={() => navigation.navigate('EditInfo', { Fname: first_name, Lname: last_name, Email: email, Phone: phone, Address: address, Grade : grade, Token : token })}>
                <Text style={{
                  backgroundColor: '#37C3FF', flex: 0, color: 'white', fontSize: 20, fontFamily: 'RobotoSlab-ExtraLight', borderWidth: 2,
                  borderColor: '#37C3FF', borderRadius: 100 / 2, bottom: 50, marginRight: screenWidth / 1.5, paddingLeft: screenWidth / 25, left: screenWidth / 2
                }}>
                  <Icon name='pen' size={20} color={'white'}></Icon> Edit Info</Text>
              </TouchableOpacity>
            </View>

          </View>

          {coverpicture ? (
            <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("CoverPic"); }}>
              <ImageBackground
                source={{ uri: coverpicture }}
                style={{ flex: 0.4, height: screenHeight / 4 }}
                resizeMode={'cover'}
              >

                <View style={{ top: screenHeight / 6, left: screenWidth / 1.2 }}></View>

                <View style={{ flex: 0.4, height: screenHeight / 4 }}></View>
              </ImageBackground>
            </TouchableOpacity>

          ) : (

            <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("CoverPic"); }}>
              <ImageBackground
                style={{ flex: 0.4, height: screenHeight / 4, backgroundColor: 'lightgrey' }}
                resizeMode={'cover'}
              >

                <View style={{ top: screenHeight / 6, left: screenWidth / 1.2 }}></View>

                <View style={{ flex: 0.4, height: screenHeight / 4 }}></View>
              </ImageBackground>
            </TouchableOpacity>
          )}



          <View style={{ top: screenHeight / 90, alignItems: 'center', justifyContent: 'center', }}>
            {profpicture ? (
              <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("ProfilePic"); }}>
                <Image
                  source={{ uri: profpicture }}
                  style={{ width: 160, height: 160, bottom: screenHeight / 8, borderRadius: 100, borderWidth: 3, borderColor: 'rgb(0, 247, 255)' }}
                />

                <View style={{ bottom: screenHeight / 5, right: screenWidth / 16 }}></View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("ProfilePic"); }}>
                <Image
                  source={require('./SrcImg/default-user-image.png')}
                  style={{ width: 160, height: 160, bottom: screenHeight / 8, borderRadius: 100, borderWidth: 3, borderColor: 'rgb(0, 247, 255)' }}
                />

                <View style={{ bottom: screenHeight / 5, right: screenWidth / 16 }}></View>
              </TouchableOpacity>
            )}

          </View>

          <View style={{ bottom: screenHeight / 10 }}>
            <Text style={{ fontFamily: 'RobotoSlab-Bold', fontSize: 18, textAlign: 'center' }}>
              {first_name} {last_name}
            </Text>
          </View>


          <View style={{ top: screenHeight / 20 }}>
            <View style={{ right: screenWidth / 5.5, bottom: screenHeight / 15 }}>
              <Text style={{
                borderBottomColor: '#37C3FF', borderBottomWidth: 3,
                fontFamily: 'RobotoSlab-Medium', fontSize: 17, marginLeft: screenWidth / 4, marginRight: screenWidth / 5.5
              }}>Personal Informations :
              </Text>
              <Icon style={{ bottom: screenHeight / 29, left: screenHeight / 2.75, color: 'black' }} name="address-card" size={22} />
            </View>

            <View style={{ height: screenHeight, flex: 1, flexDirection: 'column', width: screenWidth }}>

              <Icon name="envelope" style={{ left: screenWidth / 10 }} size={22} color={'#37C3FF'} />

              <Icon name="phone" style={{ top: screenWidth / 1.3, right: screenWidth / 2.7, transform: [{ rotate: '90deg' }] }} size={22} color={'#37C3FF'} />

              <Icon name="map-pin" style={{ top: screenWidth / 1.6, left: screenWidth / 10 }} size={22} color={'#37C3FF'} />

              <Text style={{ borderBottomColor: '#37C3FF', borderBottomWidth: 3, marginRight: screenWidth / 1.2, fontSize: 18, fontWeight: 'bold', bottom: screenWidth / 5.3, left: screenWidth / 5.5 }}>Email :</Text>

              <Text style={{ borderBottomColor: '#37C3FF', borderBottomWidth: 3, marginRight: screenWidth / 1.2, fontSize: 18, fontWeight: 'bold', top: screenHeight / 22, left: screenWidth / 5.5 }}>Phone :</Text>

              <Text style={{ borderBottomColor: '#37C3FF', borderBottomWidth: 3, marginRight: screenWidth / 1.3, fontSize: 18, fontWeight: 'bold', top: screenWidth / 2.43, left: screenWidth / 5.5 }}>Address :</Text>

              <Text style={{ bottom: screenWidth / 5, left: screenWidth / 8, fontFamily: 'RobotoSlab-Black', color: 'grey' }}>• {email}</Text>

              <Text style={{ top: screenWidth / 9, left: screenWidth / 8, fontFamily: 'RobotoSlab-Black', color: 'grey' }}>• {phone}</Text>

              <Text style={{ top: screenWidth / 2.3, left: screenWidth / 8, fontFamily: 'RobotoSlab-Black', color: 'grey' }}>• {address}</Text>
            </View>
            <View style={{ alignItems: 'center', bottom: screenHeight / 8 }}>
              <TouchableOpacity onPress={HandleLogout}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#37C3FF', borderBottomWidth: 2, borderBottomColor: 'rgb(0, 247, 255)' }}>LOG OUT</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

        {showCard && currentimage == "CoverPic" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{ height: screenHeight / 8, backgroundColor: '#37C3FF', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', left: screenWidth / 21, borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={() => { setShowPicture(true); setCurrentImage("CoverPic") }}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>View Cover Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={pickCovImage}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>Upload new Cover Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

        {showCard && currentimage == "ProfilePic" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{ height: screenHeight / 8, backgroundColor: '#37C3FF', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', left: screenWidth / 21, borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={() => { setShowPicture(true); setCurrentImage("ProfilePic") }}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>View Profile Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={pickProfImage}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'RobotoSlab-ExtraLight' }}>Upload new Profile Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

        {showPicture && currentimage == "CoverPic" && (
          <TouchableOpacity onPress={() => { setShowPicture(false); setShowCard(false) }} style={{ position: 'absolute', height: screenHeight + 50, width: screenWidth, backgroundColor: 'black' }}>
            <Image source={{ uri: coverpicture }} style={{ height: screenHeight, width: screenWidth }} resizeMode="contain" />
          </TouchableOpacity>
        )}

        {showPicture && currentimage == "ProfilePic" && (
          <TouchableOpacity onPress={() => { setShowPicture(false); setShowCard(false) }} style={{ position: 'absolute', height: screenHeight + 50, width: screenWidth, backgroundColor: 'black' }}>
            <Image source={{ uri: profpicture }} style={{ height: screenHeight, width: screenWidth }} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>

    );


  }


};

export default UserProfile;
