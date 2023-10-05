import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import {Server} from '../ServerIP';
import Footer from './Footer';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function PatientHome() {

    const [fontsLoaded] = useFonts({
        'RobotoSlab-ExtraLight': require('../../assets/fonts/RobotoSlab-ExtraLight.ttf'),
        'RobotoSlab-Black': require('../../assets/fonts/RobotoSlab-Black.ttf'),
        'RobotoSlab-Medium': require('../../assets/fonts/RobotoSlab-Medium.ttf'),
        'RobotoSlab-Light': require('../../assets/fonts/RobotoSlab-Light.ttf'),
        'RobotoSlab-Bold': require('../../assets/fonts/RobotoSlab-Bold.ttf')
      });
    
      if (!fontsLoaded) {
        return null;
      }

  return (
    <View style={{width: screenWidth, height:screenHeight}}>

        <View style={{width:screenWidth, height:screenHeight/8,}}>
           
                <Text style={{fontSize:screenWidth/18, fontFamily:'RobotoSlab-Bold', marginLeft:screenWidth/14, marginTop: screenHeight/15}}>Welcome, Ahmed</Text>

            <TouchableOpacity>
                <Icon name='comment-medical' size={30} style={{marginLeft:screenWidth/1.2, bottom: screenHeight/30}} />
            </TouchableOpacity>
        </View>

        <View style={{height: screenHeight/6, width: screenWidth}}>
           <Text style={{fontSize:screenWidth/12, fontFamily:'RobotoSlab-Black', width:screenWidth/1.6, marginLeft:screenWidth/3.5, marginTop:screenHeight/35}}>Find A Nurse Of Your Choise</Text>
           <Image
            source={require('./img/PatientHome.png')}
            style={{width:screenWidth/5, height:screenHeight/8, bottom:screenHeight/8, marginLeft:screenWidth/20}}
            />
        </View>

        <View style={{width:screenWidth, height:screenHeight/3.2}}>
            <TouchableOpacity>
            <Text style={{width:screenWidth/5, height:screenHeight/35, fontSize:screenWidth/25, fontFamily:'RobotoSlab-Medium', top:screenHeight/200, marginLeft:screenWidth/1.2, textDecorationLine: 'underline', textDecorationColor: '#37C3FF'}}>See All</Text>
            </TouchableOpacity>
            <ScrollView horizontal={true} style={{flexDirection:'row',}}>
            <View style={{height: screenHeight/3.9, width:screenWidth/1.1, marginLeft:screenWidth/35, marginTop:screenHeight/70, borderRadius:screenWidth/20, backgroundColor:'white'}}>
                <Image
                source={require('./img/CoverProf2.jpg')}
                style={{width:screenWidth/1.2, height:screenHeight/6, marginLeft:screenWidth/25, marginTop:screenHeight/120, borderRadius:screenWidth/30}}
                />
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Medium', marginLeft:screenWidth/20, marginTop:screenHeight/40}}>Geriatrics Service</Text>
                <Text style={{marginLeft:screenWidth/18, fontSize:screenWidth/35, fontFamily:'RobotoSlab-Light', marginTop:screenHeight/200}}>← Scroll</Text>
                <TouchableOpacity style={{marginLeft:screenWidth/1.9, bottom:screenHeight/20, alignItems:'center', justifyContent:'center', borderColor:'#fff', backgroundColor:'#37C3FF', borderRadius:screenWidth/20, height:screenHeight/24, width:screenWidth/3}}>
                    <Text style={{fontFamily:'RobotoSlab-ExtraLight', color:'white'}}>Create an Order</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: screenHeight/3.9, width:screenWidth/1.1, marginLeft:screenWidth/20, marginTop:screenHeight/70, borderRadius:screenWidth/20, backgroundColor:'white'}}>
                <Image
                source={require('./img/CoverProf2.jpg')}
                style={{width:screenWidth/1.2, height:screenHeight/6, marginLeft:screenWidth/25, marginTop:screenHeight/120, borderRadius:screenWidth/30}}
                />
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Medium', marginLeft:screenWidth/20, marginTop:screenHeight/40}}>Handicapped Service</Text>
                <Text style={{marginLeft:screenWidth/18, fontSize:screenWidth/35, fontFamily:'RobotoSlab-Light', marginTop:screenHeight/200}}>← Scroll</Text>
                <TouchableOpacity style={{marginLeft:screenWidth/1.9, bottom:screenHeight/20, alignItems:'center', justifyContent:'center', borderColor:'#fff', backgroundColor:'#37C3FF', borderRadius:screenWidth/20, height:screenHeight/24, width:screenWidth/3}}>
                    <Text style={{fontFamily:'RobotoSlab-ExtraLight', color:'white'}}>Create an Order</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: screenHeight/3.9, width:screenWidth/1.1, marginLeft:screenWidth/20, marginTop:screenHeight/70, borderRadius:screenWidth/20, backgroundColor:'white'}}>
                <Image
                source={require('./img/CoverProf2.jpg')}
                style={{width:screenWidth/1.2, height:screenHeight/6, marginLeft:screenWidth/25, marginTop:screenHeight/120, borderRadius:screenWidth/30}}
                />
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Medium', marginLeft:screenWidth/20, marginTop:screenHeight/200, width:screenWidth/2}}>Postoperative patients Service</Text>
                <Text style={{marginLeft:screenWidth/18, fontSize:screenWidth/35, fontFamily:'RobotoSlab-Light', marginTop:screenHeight/200}}>← Scroll</Text>
                <TouchableOpacity style={{marginLeft:screenWidth/1.9, bottom:screenHeight/20, alignItems:'center', justifyContent:'center', borderColor:'#fff', backgroundColor:'#37C3FF', borderRadius:screenWidth/20, height:screenHeight/24, width:screenWidth/3}}>
                    <Text style={{fontFamily:'RobotoSlab-ExtraLight', color:'white'}}>Create an Order</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>

        </View>

        <View style={{width:screenWidth, height:screenHeight/3.3}}>
            <TouchableOpacity>
              <Text style={{width:screenWidth/5, height:screenHeight/35, fontSize:screenWidth/25, fontFamily:'RobotoSlab-Medium', top:screenHeight/200, marginLeft:screenWidth/1.2, textDecorationLine: 'underline', textDecorationColor: '#37C3FF'}}>See All</Text>
            </TouchableOpacity>

            <ScrollView horizontal={true} style={{flexDirection:'row',}}>
            <TouchableOpacity>
            <View style={{height: screenHeight/3.9, width:screenWidth/2.7, marginLeft:screenWidth/35, marginTop:screenHeight/70, borderRadius:screenWidth/20, backgroundColor:'white'}}>
                <Image
                source={require('./img/Profile.jpeg')}
                style={{width:screenWidth/3.2, height:screenHeight/7, marginLeft:screenWidth/40, marginTop:screenHeight/120, borderRadius:screenWidth}}
                />
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Black', marginLeft:screenWidth/9, marginTop:screenHeight/100}}>Doctor X</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Medium', marginLeft:screenWidth/20, marginTop:screenHeight/100}}>Auxiliary Nurse</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Bold', marginLeft:screenWidth/20, marginTop:screenHeight/100, color:'yellow'}}>5 stars</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
            <View style={{height: screenHeight/3.9, width:screenWidth/2.7, marginLeft:screenWidth/35, marginTop:screenHeight/70, borderRadius:screenWidth/20, backgroundColor:'white'}}>
                <Image
                source={require('./img/Profile.jpeg')}
                style={{width:screenWidth/3.2, height:screenHeight/7, marginLeft:screenWidth/40, marginTop:screenHeight/120, borderRadius:screenWidth}}
                />
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Black', marginLeft:screenWidth/9, marginTop:screenHeight/100}}>Doctor Y</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Medium', marginLeft:screenWidth/20, marginTop:screenHeight/100}}>Auxiliary Nurse</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Bold', marginLeft:screenWidth/20, marginTop:screenHeight/100, color:'yellow'}}>4 stars</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{height: screenHeight/3.9, width:screenWidth/2.7, marginLeft:screenWidth/35, marginTop:screenHeight/70, borderRadius:screenWidth/20, backgroundColor:'white'}}>
                <Image
                source={require('./img/Profile.jpeg')}
                style={{width:screenWidth/3.2, height:screenHeight/7, marginLeft:screenWidth/40, marginTop:screenHeight/120, borderRadius:screenWidth}}
                />
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Black', marginLeft:screenWidth/9, marginTop:screenHeight/100}}>Doctor W</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Medium', marginLeft:screenWidth/20, marginTop:screenHeight/100}}>Auxiliary Nurse</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Bold', marginLeft:screenWidth/20, marginTop:screenHeight/100, color:'yellow'}}>5 stars</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{height: screenHeight/3.9, width:screenWidth/2.7, marginLeft:screenWidth/35, marginTop:screenHeight/70, borderRadius:screenWidth/20, backgroundColor:'white'}}>
                <Image
                source={require('./img/Profile.jpeg')}
                style={{width:screenWidth/3.2, height:screenHeight/7, marginLeft:screenWidth/40, marginTop:screenHeight/120, borderRadius:screenWidth}}
                />
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Black', marginLeft:screenWidth/9, marginTop:screenHeight/100}}>Doctor Z</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Medium', marginLeft:screenWidth/20, marginTop:screenHeight/100}}>Auxiliary Nurse</Text>
                <Text style={{fontSize:screenWidth/28, fontFamily:'RobotoSlab-Bold', marginLeft:screenWidth/20, marginTop:screenHeight/100, color:'yellow'}}>5 stars</Text>
            </View>
            </TouchableOpacity>
            </ScrollView>
        </View>
        <View style={{marginTop:screenHeight/30}}>
            <Footer/>
        </View>
      
    </View>
  );
}
