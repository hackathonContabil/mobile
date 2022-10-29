import { useState } from 'react';
import {
    NativeBaseProvider,
    VStack,
    Stack,
    Box,
    FormControl,
    Input,
    Heading,
    Icon,
    Button,
    Text,
    Select
} from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ControlledInput from '../../common/components/controlledInput';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Page from '../../common/components/page/Page'
import * as RegisterService from '../../services/register/registerService'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
    name: yup.string().min(4, "O nome deve conter no mínimo 4 caracteres").required("Informe a razão social"),
    email: yup.string().trim().email("E-mail inválido").required("Informe o seu email"),
    phone: yup.string().matches(phoneRegExp, 'Telefone inválido').required("Informe o seu telefone"),
    password: yup.string().min(8, "A senha deve ter ao menos 8 dígitos").required("Informe a senha"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'A senha de confirmação não confere.'),
    document: yup.string().required("Informe o seu CNPJ"),
    accountingOfficeId: yup.number().required("Informe o escritório")
});

const Register = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('')
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),

    });

    const createUser = async (data) => {
        await RegisterService.createUser(data)
    }

    const handleFormSubmit = (data) => {
        createUser(data)
    }

    const handleErrorSubmit = (data) => {
    }

    return (
        <Page>
            <Box
                // alignItems="center"
                // justifyContent="center"
                textAlign="center"
                width="full"
                height="full"
            >
                <Heading size="xl" textAlign={"center"}>Cadastro</Heading>
                <ScrollView>
                    <VStack width="full" padding={5} space={2}>
                        <FormControl isRequired>
                            <FormControl.Label>
                                <Text fontSize={'md'}>Razão social</Text>
                            </FormControl.Label>
                            <ControlledInput
                                control={control}
                                name="name"
                                placeholder="Digite a razão social"
                                autoCapitalize="none"
                                error={errors.name}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>
                                <Text fontSize={'md'}>CNPJ</Text>
                            </FormControl.Label>
                            <ControlledInput
                                control={control}
                                name="document"
                                placeholder="Digite o CNPJ"
                                autoCapitalize="none"
                                error={errors.document}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label marginTop={0}>
                                <Text fontSize={'md'}>Email</Text>
                            </FormControl.Label>
                            <ControlledInput
                                control={control}
                                name="email"
                                placeholder="Digite seu E-mail"
                                autoCapitalize="none"
                                error={errors.email}
                            // onChangeText={onChange}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>
                                <Text fontSize={'md'}>Telefone</Text>
                            </FormControl.Label>
                            <ControlledInput
                                control={control}
                                name="phone"
                                placeholder="Digite seu telefone"
                                autoCapitalize="none"
                                error={errors.phone}
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

                        <FormControl isRequired>
                            <FormControl.Label>
                                <Text fontSize={'md'}>Confirmação de senha</Text>
                            </FormControl.Label>
                            <ControlledInput
                                control={control}
                                type="password"
                                name="confirmPassword"
                                placeholder="Repita sua senha"
                                autoCapitalize="none"
                                error={errors.confirmPassword}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>
                                <Text fontSize={'md'}>Escritório</Text>
                            </FormControl.Label>
                            <Select placeholder="Choose Service">
                                <Select.Item label="UX Research" value="ux" />
                                <Select.Item label="UX Research 2" value="ux2" />
                                <Select.Item label="UX Research 3" value="ux3" />
                                <Select.Item label="UX Research 4" value="ux4" />
                            </Select>
                        </FormControl>
                        <Button
                            isLoading={true}
                            marginTop={10}
                            height={50}
                            colorScheme="green"
                            fontWeight={'bold'}
                            onPress={handleSubmit(handleFormSubmit, handleErrorSubmit)}
                        >
                            Cadastrar
                        </Button>
                    </VStack>
                </ScrollView>
            </Box>
        </Page >
    );
}

export default Register