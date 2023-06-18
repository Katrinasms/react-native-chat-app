import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth, db  } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, getDocs,setDoc,doc,updateDoc} from 'firebase/firestore';



const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Registered
              const user = userCredential.user;
            //   addDoc(collection(db, 'users'), { uid:user.uid, email, name });
            setDoc(doc(db, "users", user.uid), { uid:user.uid, email:email, name:name, req:[], realFriend:[] });
            // updateDoc(doc(db, "users", user.uid), {
            //     "name": "hi",
            //     // "favorites.color": "Red"
            // });
              updateProfile(user, {
                  displayName: name,
                  photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
              })
              
              .then(() => {
                  alert('Registered, please login.');
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

    return (
        <View style={styles.container}>
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
            <Input
                placeholder='Enter your image url'
                label='Profile Picture'
                value = {avatar}
                onChangeText={text => setAvatar(text)}
            />
            <Button title='register' 
            onPress={register}
            style={styles.button} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        width: 370,
        marginTop: 10
    }
});

export default Register;