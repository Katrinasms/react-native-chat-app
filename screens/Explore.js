import { collection, addDoc, getDocs, query, orderBy, onSnapshot,where,updateDoc,doc,arrayUnion} from 'firebase/firestore';
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
  LayoutAnimation,
  View,
  
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';



const ExploreScreen = ({navigation,route})=>{
    const [users, setUsers] = useState(null)
    useEffect(()=>{
        getUsers()
        
      },[])

    const getUsers = async ()=> {
        var userList = []
        const q = query(collection(db, 'users'), where('uid','!=',route.params.user_id));
        const unsubscribe = onSnapshot(q, (snapshot) => setUsers(
            snapshot.docs.map(doc => ({
                ...doc.data(),
                key: doc.data().uid
                // _id: doc.data().id,
                // name:doc.data().name
                // createdAt: doc.data().createdAt.toDate(),
                // text: doc.data().text,
                // user: doc.data().user,
            }))
        ))




    }

    const closeRow = (rowMap, rowKey) => {
        console.log(rowKey);
        //send Friend Request
        updateDoc(doc(db, "users",rowKey), {
            "req": arrayUnion(route.params.user_id),
            // "favorites.color": "Red"
        });

        //send 
        getUsers()

        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        // closeRow(rowMap, rowKey);
        // const newData = [...listData];
        // const prevIndex = listData.findIndex(item => item.key === rowKey);
        // newData.splice(prevIndex, 1);
        // setListData(newData);
    };

    return(
        <SafeAreaView >
        <StatusBar />
          <View>
                <SwipeListView
                    data={users}
                    renderItem={ (data, rowMap) => (
                        <View style={styles.rowFront}>
                            <Text>I am {data.item.name} </Text>
                            
                        </View>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                            <Text>Left</Text>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                onPress={() => closeRow(rowMap, data.item.key)}
                            >
                                <Text style={styles.backTextWhite}>招FRD子</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnRight]}
                                onPress={() => deleteRow(rowMap, data.item.key)}
                            >
                                <Text style={styles.backTextWhite}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                />

          </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
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
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});

export default ExploreScreen;
