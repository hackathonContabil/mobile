import React, { useEffect, useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import Welcome from '../views/welcome/Welcome'
import BottomBar from '../common/components/bottomBar/BottomBar'
import { Context } from '../common/context/context'
import { validateAuth } from '../services/auth/authService'

const Stack = createStackNavigator()

const authServie = () => {
    return false
}

const UnAuthViews = () => {
    return (
        <Stack.Navigator initialRouteName='welcome' headerMode='none'>
            <Stack.Screen name='register' component={Register} />
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='welcome' component={Welcome} />
        </Stack.Navigator>
    )
}

const AuthViews = () => {
    return (
        <>
            <Stack.Navigator initialRouteName='home' headerMode='none'>
                <Stack.Screen name='home' component={Home} />
            </Stack.Navigator>
            <BottomBar />
        </>
    )
}

const Auth = () => {
    const [isAuth, setIsAuth] = useState(false)
    // const { user, setUser } = useContext(Context)

    useEffect(() => {
        setIsAuth(authServie())
    }, [])

    // const auth = async () => {
    //     const data = await validateAuth()
    // }

    if (isAuth) return AuthViews()

    return UnAuthViews()
}

export default Auth