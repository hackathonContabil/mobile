import React, { useEffect, useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/home/Home'
import Transactions from '../views/transactions/Transactions'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import Permission from '../views/permission/Permission'
import Welcome from '../views/welcome/Welcome'
import BottomBar from '../common/components/bottomBar/BottomBar'
import { Context } from '../common/context/context'
import * as AuthService from '../services/auth/authService'
import { Text, View } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { Icon } from 'native-base'
import AddBank from '../views/addBank/AddBank'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const Auth = () => {
    const {
        isAuth,
        setIsAuth,
        isSharingBankAccountData,
        setIsSharingBankAccountData
    } = useContext(Context)

    useEffect(() => {
        auth()
    }, [])

    const auth = async () => {
        const authValidateData = await AuthService.validateAuth()
        console.log(authValidateData)
        if (!authValidateData.success) {
            setIsAuth(false)
            return
        }

        const { data: { data } } = authValidateData
        setIsAuth(true)
        setIsSharingBankAccountData(data.isSharingBankAccountData)
    }

    const getViewsByUserState = () => {
        if (!isAuth) {
            return (
                <Stack.Navigator
                    initialRouteName={'welcome'}
                    headerMode='none'
                >
                    <>
                        <Stack.Screen name='register' component={Register} />
                        <Stack.Screen name='login' component={Login} />
                        <Stack.Screen name='welcome' component={Welcome} />
                    </>
                </Stack.Navigator>
            )
        }

        if (!isSharingBankAccountData) {
            return (
                <Stack.Navigator
                    initialRouteName={'permission'}
                    headerMode='none'
                >
                    <>
                        <Stack.Screen name='permission' component={Permission} />
                    </>
                </Stack.Navigator>
            )
        }

        return (
            <Tab.Navigator initialRouteName='home'>
                <Tab.Screen name="transactions" component={Transactions} options={{
                    header: () => { },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon as={<MaterialIcons name='sync-alt' />} size="xl" />
                        )
                    },
                    title: 'transações'
                }} />
                <Tab.Screen name="add_bank" component={AddBank} options={{
                    header: () => { },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon as={<MaterialIcons name='account-balance' />} size="xl" />
                        )
                    },
                    title: 'Adicionar banco'
                }} />
            </Tab.Navigator>
        )
    }

    return (
        <>
            {getViewsByUserState()}
        </>
    )
}

export default Auth