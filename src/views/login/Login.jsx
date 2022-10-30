import { useState, useContext } from 'react';
import {
    VStack,
    Box,
    FormControl,
    Heading,
    Button,
    Text,
    HStack,
    Icon,
} from 'native-base'

import { Error } from '../../common/components/error/styles'

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ControlledInput } from '../../common/components/controlledInput';
import Page from '../../common/components/page/Page'
import * as AuthService from '../../services/auth/authService'
import { getItem, saveItem } from '../../common/utils/storage'
import { Context } from '../../common/context/context'
import { MaterialIcons } from '@expo/vector-icons'

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

    const { setIsAuth } = useContext(Context)

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

    return (
        <Page>
            <Box
                justifyContent="center"
                textAlign="center"
                width="full"
                height="full"
            >
                <HStack padding={5} alignItems="center" justifyContent={"center"}>
                    <Box>
                        <Text
                            fontSize={30}
                            color="gray.500"
                            fontWeight={"bold"}
                        >
                            Login
                        </Text>
                    </Box>
                </HStack>
                {/* <Heading size="xl" textAlign={"center"}>Login</Heading> */}
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
                        colorScheme="blue"
                        fontWeight={'bold'}
                        onPress={handleSubmit(handleFormSubmit)}
                    >
                        Entrar
                    </Button>
                </VStack>
            </Box>
        </Page>
    );
}

export default Login