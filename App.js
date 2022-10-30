import { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { extendTheme, NativeBaseProvider, Text } from 'native-base';
import Login from './src/views/login/Login';
import Home from './src/views/home/Home';
import Register from './src/views/register/Register';
import Welcome from './src/views/welcome/Welcome';
// import Scroll from '../views/scroll/Scroll';
import Auth from './src/route/Auth'
// import {StatusBar} from 'react-native'
import BottomBar from './src/common/components/bottomBar/BottomBar'
import { Context, ContextProvider } from './src/common/context/context'

export default function App() {
  // const Tab = createBottomTabNavigator();
  // const Stack = createStackNavigator()

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
    <NavigationContainer>
      <StatusBar style='auto' />
      <NativeBaseProvider theme={theme}>
        <ContextProvider>
          <Auth />
        </ContextProvider>
        {/* <BottomBar /> */}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
