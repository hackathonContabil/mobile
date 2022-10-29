import { useState } from 'react';
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
import ControlledInput from '../../common/components/controlledInput';
import Page from '../../common/components/page/Page'
import * as AuthService from '../../services/auth/authService'

const schema = yup.object({
    email: yup.string().trim().email("E-mail inválido").required("Informe o seu email"),
    password: yup.string().required("Informe a senha"),
});

const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [actionError, setActionError] = useState('')
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const login = async (data) => {
        setActionError('')
        setLoading(true)
        const resp = await AuthService.login(data)
        setLoading(false)

        if(!resp.success){
            setActionError(resp.message)
            return
        }
        navigation.navigate('home')
    }

    const handleFormSubmit = (data) => {
        console.log(data)
        login(data)
    }

    const handleErrorSubmit = (data) => {
        console.log(data)
    }

    return (
        <Page>
            <Box
                justifyContent="center"
                textAlign="center"
                width="full"
                height="full"
            >
                <Heading size="xl" textAlign={"center"}>Login</Heading>
                <VStack width="full" padding={5} space={2} justifyContent="center">
                    <FormControl isRequired>
                        <FormControl.Label>
                            <Text fontSize={'md'}>Email</Text>
                        </FormControl.Label>
                        <ControlledInput
                            control={control}
                            name="email"
                            placeholder="Digite seu e-mail"
                            autoCapitalize="none"
                            error={errors.email}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormControl.Label>
                            <Text fontSize={'md'}>Senha</Text>
                        </FormControl.Label>
                        <ControlledInput
                            control={control}
                            type="password"
                            name="password"
                            placeholder="Digite sua senha"
                            autoCapitalize="none"
                            error={errors.password}
                        />
                    </FormControl>

                    <Error>{actionError}</Error>
                    <Button
                        isLoading={loading}
                        marginTop={10}
                        height={50}
                        colorScheme="green"
                        fontWeight={'bold'}
                        onPress={handleSubmit(handleFormSubmit, handleErrorSubmit)}
                    >
                        Entrar
                    </Button>
                </VStack>
            </Box>
        </Page >
    );
}

export default Login