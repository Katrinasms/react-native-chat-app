import { collection, addDoc, getDocs, query, orderBy, onSnapshot,where,updateDoc,doc,arrayUnion,collectionGroup} from 'firebase/firestore';
import React, { useEffect, useState,useLayoutEffect,Fragment} from 'react';
import { auth, db } from '../firebase';
import { Dimensions } from 'react-native'

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
  LayoutAnimation,
  View,
  
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';



const ExploreScreen = ({navigation,route})=>{
    const [users, setUsers] = useState([])
    const [realFriend, setRealFriend] = useState([])
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;





    useEffect(() => {
    const getUserContacts = () => {
        const q = query(doc(db, "users", route.params.user_id));
        const unsubscribe = onSnapshot(q,  async(snapshot) => {
        const contactsObject = await snapshot.data().realFriend;
        contactsObject.push(route.params.user_id)
        const q1= query(collection(db, "users"),  where("uid", 'not-in',contactsObject));
        const contactsSnap = await getDocs(q1)
        const contactDetails = contactsSnap.docs.map((d)=> ({
            ...d.data(),
            key: d.data().uid,
        }))
        console.log(contactDetails)
        setUsers(contactDetails);
        })}
    
    
    getUserContacts()
    }, [navigation])


    const closeRow = (rowMap, rowKey) => {
        console.log(rowKey);
        //send Friend Request
        updateDoc(doc(db, "users",rowKey), {
            "req": arrayUnion(route.params.user_id),
            // "favorites.color": "Red"
        });

        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
            const newUsers = [...users];
            const prevIndex = users.findIndex(item => item.key === rowKey);
            newUsers.splice(prevIndex, 1);
            setUsers(newUsers);
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newUsers = [...users];
        const prevIndex = users.findIndex(item => item.key === rowKey);
        newUsers.splice(prevIndex, 1);
        setUsers(newUsers);
    };

    return(
       <Fragment>
         <SafeAreaView style={{ flex: 0, backgroundColor: '#FFFFFF' }} />
        {/* <SafeAreaView style={{flex: 1 }}> */}
        <View style={{backgroundColor: '#E5EAFD',flex:1, alignItems: 'center'}}>
        <Image source={require('../assets/Explore_hero.jpg')} style={{  width: imageWidth , height: 270, marginBottom:15, marginTop:0}} />
        <Text style={{marginVertical: 20, fontWeight: '800'}} >SWIPE to find who is your FRIEND</Text>
        
          <View style={styles.container}>
                <SwipeListView
                    useFlatList={true}
                    data={users.slice(0, 4)}
                    maxToRenderPerBatch={5}
                    renderItem={ (data, rowMap) => (
                        <View style={styles.rowFront}>
                            <Text>I am {data.item.name} </Text>
                            <Image source={{uri: data.item.avatar}} style={{width: 50 , height: 50,}}/>
                            
                        </View>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backLeftBtn]}
                                onPress={() => deleteRow(rowMap, data.item.key)}
                            >
                                <Text style={styles.backTextWhite}>No...</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                onPress={() => closeRow(rowMap, data.item.key)}
                            >
                                <Text style={styles.backTextWhite}>Be My Friend</Text>
                            </TouchableOpacity>
                        
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />


          </View>
       </View>
          </Fragment>
    
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5EAFD',
        flex: 1,
        width: '90%'
    
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 0,
        justifyContent: 'center',
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        height: 10,
        justifyContent: 'space-between',
        paddingLeft: 15, 
        borderRadius: 10 ,
        marginBottom: 10,
      
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        
    },
    backRightBtnLeft: {
        backgroundColor: '#AE64F3',
        right: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    backLeftBtn: {
        backgroundColor: '#F4B1BA',
        left: 0,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
});

export default ExploreScreen;
