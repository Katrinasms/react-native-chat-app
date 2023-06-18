import React, { useState } from 'react';
import { View, StyleSheet,Image,Dimensions } from 'react-native'
import { Input } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'react-native-linear-gradient';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';


const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    const openRegisterScreen = () => {
        navigation.navigate('Register');
      };

    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user.uid)
            navigation.navigate('MyTab', {user_id:userCredential.user.uid});
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });
      };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/hero.jpg')} style={{  width: imageWidth , height: 270, marginBottom:30}} />

        <View style={styles.smallScreen}>
            <Input
                placeholder='Enter your email'
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title='sign in' style={styles.button}  onPress={signin}  
            //     ViewComponent={LinearGradient} // Don't forget this!
            //     linearGradientProps={{
            //         colors: ['#FF9800', '#F44336'],
            //         start: { x: 0, y: 0.5 },
            //         end: { x: 1, y: 0.5 },
            // }}
            />
            <Button title='register' style={styles.button} onPress={openRegisterScreen}/>
            {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                <Text>
                    Sign in with Facebook
                </Text>
            </LinearGradient> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4E50F7'
    },
    button: {
        width: 0.7 * Dimensions.get('window').width,
        marginTop: 10,
        // color: '#4E50F7'
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

export default Login;