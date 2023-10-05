import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity, Linking} from 'react-native';

const TestPr =({navigation}) =>{
    return(
<View style={{top: 400, alignItems:'center',}}>
    <Text style={{color:'rgb(0, 247, 255)', fontSize:18}}>This settings</Text>

    <TouchableOpacity>

<Button title='go to profile' onPress={() => navigation.navigate('Profile')}>

</Button>

    </TouchableOpacity>

</View>

    );
}

export default TestPr