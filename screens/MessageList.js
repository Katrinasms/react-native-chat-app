import { collection, addDoc, query, orderBy, onSnapshot,where,getDoc,doc,updateDoc,arrayUnion,arrayRemove} from 'firebase/firestore';
import React, { useEffect, useState,useLayoutEffect,} from 'react';
import { auth, db } from '../firebase';
// import { collection, query, where } from "firebase/firestore";
import {
  SafeAreaView,
  StatusBar,

  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
  Button,
  useColorScheme,
  View,
  
} from 'react-native';


const MessageScreen = ({navigation,route})=>{
    // const [users, setUsers] = useState(null)

    // const getUsers = async ()=> {
    //     var userList = []
    //     console.log(route.params.user_id)
    //     const q = query(collection(db, 'users'), where('uid','!=',route.params.user_id));
    //     console.log(q);
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         userList.push(doc.data())
    //     console.log(doc.id, " => ", doc.data());
    //     });
    //     console.log(userList);
    //     setUsers(userList)
    // }

    // useEffect(()=>{
    //     getUsers()
    //   },[])



      const [notiUsers, setNotiUsers] = useState([])
      const [Users, setUsers] = useState([])
  
      const getNotiUser = async ()=> {
          const q = query(doc(db, "users", route.params.user_id));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            var userList1 = []
            console.log(snapshot.data());
            if (snapshot.data().realFriend.length > 0){
              snapshot.data().realFriend.forEach(
                (uid) =>
                {
                  const docRef1 = doc(db, "users", uid);
                  const _unsubscribe = onSnapshot(docRef1, (snapshot) => {
                    userList1.push(snapshot.data())
                  console.log(snapshot.data());
                  }) })}
            setNotiUsers(userList1)
            
          })
  
        }
  
      useEffect(()=>{
          getNotiUser();
        },[])

    return(
        <SafeAreaView >
        <StatusBar />
        {/* <ScrollView> */}
          <View>
              <FlatList
                  data={notiUsers}
                //   keyExtractor={(item)=>item.uid}
                  renderItem={({item}) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Chat', {name: item.name, uid: item.uid})} >
                      <View style={styles.card} >
                          <Image style={styles.userImageST} source={{uri: 'https://placeimg.com/140/140/any'}} />
                        <View style={styles.textArea}>
                      <Text style={styles.nameText} >{item.name}</Text>
                      <Text style={styles.msgContent} >{item.email}</Text>
                      </View>
                      </View>
                      </TouchableOpacity>
                  )}
                  />
          </View>
          {/* </ScrollView> */}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }, 
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'Verdana'
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

})

export default MessageScreen;
