import { useState, useContext } from 'react';
import {
    VStack,
    Box,
    FormControl,
    Heading,
    Button,
    Text,
} from 'native-base'

import { Error } from '../../common/components/error/styles'

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {ControlledInput} from '../../common/components/controlledInput';
import Page from '../../common/components/page/Page'
import * as AuthService from '../../services/auth/authService'
import { getItem, saveItem } from '../../common/utils/storage'
import {Context} from '../../common/context/context'

const schema = yup.object({
    email: yup.string().trim().email("E-mail inválido").required("Informe o seu email"),
    password: yup.string().required("Informe a senha"),
});

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [actionError, setActionError] = useState('')
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const {setIsAuth} = useContext(Context)

    const login = async (data) => {
        setActionError('')
        setLoading(true)
        const resp = await AuthService.login(data)
        setLoading(false)

        if (!resp.success) {
            setActionError(resp.message)
            return
        }
        saveItem('TOKEN', resp.data.data.token)
        setIsAuth(true)
    }

    const handleFormSubmit = (data) => {
        login(data)
    }

    const handleErrorSubmit = (data) => {
    }

    return (
        <Page>
            <Box
                justifyContent="center"
                textAlign="center"
                width="full"
                height="full"
            >
                <Heading size="xl" textAlign={"center"}>Home</Heading>
            </Box>
        </Page >
    );
}

export default Home