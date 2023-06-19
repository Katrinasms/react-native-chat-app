import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Chat from './screens/Chat';
import MessageScreen from './screens/MessageList';
import MyTabs from './screens/TabBar';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Login' component={Login} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })}/>
        <Stack.Screen name='Register' component={Register} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })}/>
        <Stack.Screen name='Chat' component={Chat} options={
          ({ route }) => ({ title: route.params.name, headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
 })
          }/>
        <Stack.Screen name='Messages' component={MessageScreen} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })}/>
        <Stack.Screen name='MyTab' component={MyTabs} options={() => ({
          headerBackVisible: false,
          headerShown: false,
          // headerShown: false,
        })}
        />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
