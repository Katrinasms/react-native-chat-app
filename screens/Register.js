import React, { useState, Fragment } from 'react';
import { View, StyleSheet,Image,Dimensions,TouchableOpacity,Text,SafeAreaView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth, db  } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, getDocs,setDoc,doc,updateDoc} from 'firebase/firestore';



const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('https://robohash.org/default');
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), { uid:user.uid, email:email, name:name, req:[], realFriend:[], avatar:avatar  });
          
              updateProfile(user, {
                  displayName: name,
                  photoURL: avatar ? avatar : 'https://robohash.org/default',
              })
              
              .then(() => {
                  alert('Registered, please login.');
                  navigation.navigate('Login');
              })
              .catch((error) => {
                  alert(error.message);
              })
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage);
          });

        
      }

      const generate = ()=>{
        if (name != ''){
            setAvatar('https://robohash.org/'+name)
            console.log(avatar)
        }
      }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FFFFFF' }} />
        <View style={styles.container}>
             <Image source={require('../assets/joinus.jpg')} style={{  width: imageWidth , height: 270, marginBottom:30}} />

            <View style={styles.smallScreen}>
            <Input
                placeholder='Enter your name'
                label='Name'
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder='Enter your email'
                label='Email'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                value={password} onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center',}}>
            <Image source={{uri: avatar}} style={{  width: 60 , height: 60, marginLeft: 50}} />
                <TouchableOpacity
                        onPress={() =>{
                            generate();
                        }
                            }
                        style={{
                            backgroundColor: '#A8A8A8',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            width: '50%',
                            borderRadius: 5,
                            // marginBottom: 10
                        }}>
                            <Text style={{
                                textAlign: 'center', color: '#FFFFFF'
                            }}>Generating Your Avatar</Text>
                </TouchableOpacity>
                
             
             </View>
            {/* <Input
                placeholder='Enter your image url'
                label='Profile Picture'
                value = {avatar}
                onChangeText={text => setAvatar(text)}
            /> */}
            <TouchableOpacity
                     onPress={() =>{
                        register();
                     }
                        }
                     style={{
                         backgroundColor: '#4E50F7',
                         paddingHorizontal: 5,
                         paddingVertical: 10,
                          width: '70%', borderRadius: 15,
                          marginBottom: 10
                     }}>
                         <Text style={{
                             textAlign: 'center', color: '#FFFFFF', fontSize: 18
                         }}>Register</Text>
             </TouchableOpacity>
             <TouchableOpacity
                     onPress={() =>{
                        navigation.navigate('Login');
                     }
                        }
                     style={{
                         backgroundColor: '#414242',
                         paddingHorizontal: 5,
                         paddingVertical: 10,
                          width: '70%', borderRadius: 15,
                     }}>
                         <Text style={{
                             textAlign: 'center', color: '#FFFFFF', fontSize: 18
                         }}>Back</Text>
             </TouchableOpacity>
         
            </View>
        </View>
        </Fragment>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#7766F2'
    },
    button: {
        width: 370,
        marginTop: 10
    },
    smallScreen:{
        width: 0.9 * Dimensions.get('window').width,
        flex: 1,
        backgroundColor:'#FFFFFF',
        paddingTop: 40,
        padding: 20,
        alignItems: 'center',
        borderRadius: 4,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

    }
});

export default Register;