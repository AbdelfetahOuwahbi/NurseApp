import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

const Grade = ({route, navigation}) => {

  const {patient_id, token, service} = route.params; // receiving infos from the other page 
  console.log("patient id is :", patient_id);
  console.log("the service he selected is :", service);
  console.log("the patient's token is :", token);


  const grades = [
    { name: 'Auxiliaire', image: require('./img/CoverProf2.jpg') },
    { name: 'Spécialisé', image: require('./img/CoverProf2.jpg') },
    { name: 'Croissant rouge', image: require('./img/CoverProf2.jpg') },
    { name: 'Ambulancier', image: require('./img/CoverProf2.jpg') },
    { name: 'Reducation', image: require('./img/CoverProf2.jpg') },
    { name: 'Aide soignant', image: require('./img/CoverProf2.jpg') },
  ];

  const handleServicePress = (grade) => {

    navigation.navigate('Commande', {patient_id: patient_id, token: token, service: service, grade: grade.name});
  };

  return (
    <View style={styles.container}>

<View style={{bottom:screenHeight/80, height:screenHeight/10, width:screenWidth, backgroundColor:'#0096FF', borderBottomColor:'grey', borderBottomWidth:2}}>
  <Text style={{color:'white', fontSize:35, fontWeight:'bold', left: screenWidth/30, top:screenHeight/28}}> Les Serveurs :</Text>
  <Icon style={{left:screenWidth/1.15, bottom:screenHeight/150, color:'white'}} name="user-nurse" onPress={() => navigation.navigate('PatientNotifs', {patient_id: patient_id, token: token})} size={22} />
</View>

<ScrollView>
{grades.map((grade) => (
        
        <TouchableOpacity
          key={grade.name}
          style={styles.grade}
          underlayColor="#DDDDDD"
          onPress={() => handleServicePress(grade)}
        >
          <>
            <Image source={grade.image} style={styles.gradeImage} />
            <Text style={styles.gradeText}>{grade.name}</Text>
          </>
        </TouchableOpacity>
      ))}
</ScrollView>

<View style={styles.footer}>
      <TouchableOpacity style={styles.icon}>
        <Icon name="home" size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name="plus" style={{borderRadius:screenHeight/30, borderColor:'white',
         borderWidth:screenWidth/180, width:screenWidth/9, height:screenWidth/9, 
         paddingLeft:screenWidth/32, paddingTop:screenWidth/40}} size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name="user" onPress={() => navigation.navigate('UserProfile')} size={22} color="white" />
      </TouchableOpacity>
    </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor:'#565656',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  grade: {
    borderBottomColor:'rgb(0, 247, 255)',
    borderBottomWidth:2,
    borderTopColor:'rgb(0, 247, 255)',
    borderTopWidth:2,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeImage: {
    width: screenWidth/1.2,
    height: screenHeight/4,
    marginBottom: 10,
    borderRadius:20
  },
  gradeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
    fontSize:18
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: screenHeight/12,
    width:screenWidth,
    backgroundColor: '#0096FF',
    borderTopColor:'grey',
    borderTopWidth:2,
    top:screenHeight/82

  },

  icon: {
    alignItems: 'center',
  },

});

export default Grade;
