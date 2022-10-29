import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { extendTheme, NativeBaseProvider, Text } from 'native-base';
import Login from './src/views/login/Login';
import Home from './src/views/home/Home';
import Register from './src/views/register/Register';
import Welcome from './src/views/welcome/Welcome';
// import Scroll from '../views/scroll/Scroll';
import Auth from './src/auth/Auth'
// import {StatusBar} from 'react-native'

export default function App() {
  const Stack = createStackNavigator()

  const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          rounded: 'md',
        },
        defaultProps: {
          // colorScheme: 'green',
        },
      },
      Input: {
        defaultProps: {
          size: 'md',
          color: 'gray.500',
          colorScheme: 'gray',
          fontWeight: "semibold",
          selectionColor: 'gray.600',
          _focus: { borderColor: "gray.400", bgColor: "gray.100" }
        },
      }
    },
  });
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style='auto'/>
      <NativeBaseProvider theme={theme}>

        <Auth />
        {/* <Stack.Navigator initialRouteName="login" headerMode="none">
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="login" component={Login} />
        </Stack.Navigator> */}
      </NativeBaseProvider>
    </NavigationContainer>

    // <NativeBaseProvider theme={theme}>
    //   <Login />
    // </NativeBaseProvider>
  );
}
