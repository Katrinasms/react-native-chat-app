// import * as React from 'react';
import React, { useCallback, useState, useLayoutEffect ,useEffect} from 'react';
import { Text, View ,TouchableOpacity,Avatar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageScreen from './MessageList';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import NotificationScreen from './Notification';
import ExploreScreen from './Explore';

const Tab = createBottomTabNavigator();

export default  function MyTabs({route, navigation}) {
    const user = route.params.user_id;
    const signOutNow = () => {
        signOut(auth).then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }).catch((error) => {});
    }

    useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                {/* <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL,
                    }}
                /> */}
            </View>
        ),
        headerRight: () => (
            <TouchableOpacity style={{
                marginRight: 10
            }}
            onPress={signOutNow}
            >
                <Text>logout</Text>
            </TouchableOpacity>
        )
    })
    
}, [navigation]);
  return (
    <Tab.Navigator>
      <Tab.Screen name="MessageScreen" component={MessageScreen} initialParams={{user_id: user}}
      options={() => ({
        headerBackVisible: false,
        headerShown: false,
      })}/>
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} initialParams={{user_id: user}}
      options={() => ({
        headerBackVisible: false,
        headerShown: false,
      })}/>
      <Tab.Screen name="ExploreScreen" component={ExploreScreen} initialParams={{user_id: user}}
      options={() => ({
        headerBackVisible: false,
        headerShown: false,
      })}/>
    </Tab.Navigator>
  );
}