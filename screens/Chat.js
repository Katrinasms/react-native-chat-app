import React, { useCallback, useState, useLayoutEffect ,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot,setDoc,doc } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
// import firestore from '@react-native-firebase/firestore';


const Chat = ({ navigation,route }) => {
    console.log(route.params.name)
    console.log(route.params.uid)
    console.log(auth?.currentUser.uid)
    const c_uid = auth?.currentUser.uid;
    const t_uid = route.params.uid;


    const [messages, setMessages] = useState([]);
    const signOutNow = () => {
        signOut(auth).then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
        }).catch((error) => {});
    }

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <View style={{ marginLeft: 20 }}>
    //                 <Avatar
    //                     rounded
    //                     source={{
    //                         uri: auth?.currentUser?.photoURL,
    //                     }}
    //                 />
    //             </View>
    //         ),
    //         headerRight: () => (
    //             <TouchableOpacity style={{
    //                 marginRight: 10
    //             }}
    //                 onPress={signOutNow}
    //             >
    //                 <Text>logout</Text>
    //             </TouchableOpacity>
    //         )
    //     })
        
    //     const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    //     const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
    //         snapshot.docs.map(doc => ({
    //             _id: doc.data()._id,
    //             createdAt: doc.data().createdAt.toDate(),
    //             text: doc.data().text,
    //             user: doc.data().user,
    //         }))
    //     )
    //     );

    //     return () => {
    //       unsubscribe();
    //     };

    // }, [navigation]);

    useEffect(() => {
        getAllMessages()
      },[]);

    const getAllMessages = async () => {
        const chatid = t_uid > c_uid ? c_uid+ "-" +t_uid : t_uid+ "-" +c_uid
  

        // var msgList = []
        const q = query(collection(db, 'Chats', chatid,'messages'),orderBy('createdAt', "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
          snapshot.docs.map(doc => ({...doc.data(),createdAt:doc.data().createdAt.toDate()}))
        )
        );
        
        // console.log(q);
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {

        //     console.log(doc.id, " => ", doc.data());
        //     msgList.push({...doc.data(),createdAt:doc.data().createdAt.toDate()})
        // });
        // setMessages(msgList);



      }

    // const onSend = useCallback(async(messages = []) => {
    //     const { _id, createdAt, text, user,} = messages[0]
    //     addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });

      

    // }, []);


    const onSendMsg = async (msgArray) => {
        const msg = msgArray[0]
        const time = new Date();
        const userMsg = {
          ...msg,
          sentBy: c_uid,
          sentTo: t_uid,
          createdAt: time
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, userMsg))
        const chatid = t_uid > c_uid ? c_uid+ "-" +t_uid : t_uid+ "-" +c_uid
        
        //collection of React
        const docRef = collection(db, 'Chats', chatid,'messages');
        await addDoc(docRef,{...userMsg,createdAt:time});

      }
      



    return (
        // <GiftedChat
        //     messages={messages}
        //     showAvatarForEveryMessage={true}
        //     onSend={messages => onSend(messages)}
        //     user={{
        //         _id: auth?.currentUser?.email,
        //         name: auth?.currentUser?.displayName,
        //         avatar: auth?.currentUser?.photoURL
        //     }}
        // />
        <GiftedChat 
        style={{flex: 1}}
        messages={messages}
        onSend={text => onSendMsg(text)}
        user={{ 
          _id: c_uid,
        }}
        />
    );
}

export default Chat;






  //add Chatgpt
        // addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });
        // try {
        //     const response = await fetch("http://localhost:80", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ prompt: text }),
        //     });
      
        //     const data = await response.json();
        //     if (response.status !== 200) {
        //       throw data.error || new Error(`Request failed with status ${response.status}`);
        //     }
        //     addDoc(collection(db, 'chats'), { _id:uuidv4(), createdAt:new Date() , text:data.bot, 
        //             user:{
        //                 _id: 'chatgpt@gmail.com',
        //                 name: "CHATGPT",
        //                 avatar: "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x"
        //             } });
        //   } catch(error) {
        //     console.error(error);
        //     alert(error.message);
        //   }