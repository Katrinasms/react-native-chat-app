import { collection, addDoc,  query, orderBy, onSnapshot,where,getDoc,doc,updateDoc,arrayUnion,arrayRemove} from 'firebase/firestore';
import React, { useEffect, useState, Fragment} from 'react';
import { auth, db } from '../firebase';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  View
} from 'react-native';
import { signOut } from 'firebase/auth';


const NotificationScreen = ({navigation,route})=>{
    const [notiUsers, setNotiUsers] = useState([])
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    const signOutNow = () => {
      signOut(auth).then(() => {
          navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
          });
      }).catch((error) => {});
  }

  const getUserContacts = () => {
    // const contactDetails = [];
    const q = query(doc(db, "users", route.params.user_id));
    const unsubscribe = onSnapshot(q,  async(snapshot) => {
      const contactsObject = snapshot.data().req;
      const contactsSnap = await Promise.all(contactsObject.map((c) => getDoc(doc(db, "users",c))))
      const contactDetails = contactsSnap.map((d)=> ({
        id: d.uid,
        ...d.data()
      }))

      setNotiUsers(contactDetails);
    })}

useEffect(() => {



  getUserContacts();
}, [navigation])



    //accept
    const acceptAction = (uid) => {
      updateDoc(doc(db, "users",uid), {
        "realFriend": arrayUnion(route.params.user_id),
      });
      updateDoc(doc(db, "users",route.params.user_id), {
        "req": arrayRemove(uid),
        "realFriend": arrayUnion(uid),
      });
    }

    const rejectAction = (uid) => {
      updateDoc(doc(db, "users",route.params.user_id), {
        "req": arrayRemove(uid),
        // "favorites.color": "Red"
    });
    }

    return(
      <Fragment>
       <SafeAreaView style={{ flex:0, backgroundColor: '#FAF8E7' }} />
        <View  style={{backgroundColor: '#FF6C77',flex:1, alignItems: 'center'}}>
          <Image source={require('../assets/Noti_hero.jpg')} style={{  width: imageWidth , height: 270, marginBottom:30, marginTop:0}} />
           
                {/* {(notiUsers.length > 0)? */}

                <FlatList
                    data={notiUsers}
                    renderItem={({ item }) => (
                      <View style={styles.card}>
                        <View style={styles.item}>
                          <Image source={{uri: item.avatar}} style={styles.itemImage} />
                          <View style={styles.itemContent}>
                            <Text style={styles.itemName}>{item.name} Want to be your friend</Text>
                            <View style={styles.buttons}>
                              <TouchableOpacity style={styles.button} onPress={() => {
                                    acceptAction(item.uid)
                                    navigation.navigate('Chat', {name: item.name, uid: item.uid})
                                  }} >
                                <Text style={styles.buttonText}>Yes, SURE</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.button} onPress={() => {
                                    // acceptAction(item.uid)
                                    rejectAction(item.uid)
                                  }}>
                                <Text style={styles.buttonText}>No, Bye</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        
                      </View>
                    )}
                    keyExtractor={item => item.uid}
                  />
             

              
                   
          {/* </View> */}
      </View>
      <TouchableOpacity
          activeOpacity={0.7}
          onPress={signOutNow}
          style={styles.touchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
            // source={{
            //   uri:
            //     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            // }}
            //You can use you project image Example below
            source={require('../assets/logout.png')}
            style={styles.floatingButtonStyle}
          />
          {/* <MaterialIcons name="explore" style={styles.floatingButtonStyle} /> */}
        </TouchableOpacity>
      </Fragment>

     
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
  // card: {
  //   backgroundColor: '#FFA600',
  //   // padding: 10,
  //   // width: '100%',
  //   // height: 'auto',
  //   // marginLeft:10,
  //   // marginRight: 10,
  //   // marginVertical: 6,
  //   // paddingVertical: 10,
  //   // paddingHorizontal: 10,
  //   borderRadius: 10,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   // justifyContent: 'flex-start'
  // },
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
    marginVertical: 10,
    marginLeft: 10
  }, 
  textArea: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // padding: 5,
    // paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
    // borderBottomWidth: 1,
    // borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'Verdana',
    // width: '80%',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    // justifyContent: 'flex-start'
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

box: {
  padding: 5,
  marginTop: 5,
  marginBottom: 5,
  backgroundColor: '#FFFFFF',
  flexDirection: 'row',
  shadowColor: 'black',
  shadowOpacity: 0.2,
  shadowOffset: {
    height: 1,
    width: -2,
  },
  elevation: 2,
  width: '90%'
},
username: {
  color: '#20B2AA',
  fontSize: 20,
  alignSelf: 'center',
  marginLeft: 10,
  width: '80%'
},
image: {
  width: 60,
  height: 60,
},
body: {
  padding: 30,
  backgroundColor: '#FF6C77',
},
card: {
  // marginHorizontal:20,
  // alignSelf: 'center',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2,
  marginBottom: 20,
  width: Dimensions.get('window').width*0.9
},
item: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},
itemImage: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginRight: 40,
},
itemContent: {
  flex: 1,
},
itemName: {
  fontSize: 16,
  fontWeight: 'bold',
},
itemPrice: {
  fontSize: 16,
  color: '#999',
},
buttons: {
  marginTop:10,
  flexDirection: 'row-reverse',
},
button: {
  backgroundColor: '#FFC107',
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
},
touchableOpacityStyle: {
  position: 'absolute',
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  right: 30,
  bottom: 30,
},
floatingButtonStyle: {
  resizeMode: 'contain',
  width: 50,
  height: 50,
  //backgroundColor:'black'
},

})

export default NotificationScreen;
