import { useEffect, useState } from 'react';
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
    Select,
    Spinner,
    HStack
} from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ControlledInput, ControlledSelectInput } from '../../common/components/controlledInput';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Page from '../../common/components/page/Page'
import * as RegisterService from '../../services/register/registerService'
import * as AccountingOfficeService from '../../services/accountingOffice/accountingOfficeService'
import { Error } from '../../common/components/error/styles'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
    name: yup.string().min(8, "O nome deve conter no mínimo 8 caracteres").required("Informe a razão social"),
    email: yup.string().trim().email("E-mail inválido").required("Informe o seu email"),
    phone: yup.string().matches(phoneRegExp, 'Telefone inválido').required("Informe o seu telefone"),
    password: yup.string().min(8, "A senha deve ter ao menos 8 dígitos").required("Informe a senha"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'A senha de confirmação não confere.'),
    document: yup.string().required("Informe o seu CNPJ"),
    accountingOfficeId: yup.number().required("Informe o escritório")
});

const Register = ({ navigation }) => {
    const [accountOfficeLoading, setAccountOfficeLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [actionError, setActionError] = useState('')
    const [accountOfficeData, setAccountOfficeData] = useState([])
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('')
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const createUser = async (data) => {
        setActionError('')
        setLoading(true)
        const response = await RegisterService.createUser(data)
        setLoading(false)

        if (!response.success) {
            setActionError(response.message)
            return
        }

        navigation.navigate('login')
    }

    const handleFormSubmit = (data) => {
        createUser(data)
    }

    const handleErrorSubmit = (data) => {
        // createUser(data)
    }

    const getAccountingOffices = async () => {
        const data = await AccountingOfficeService.getAccountOffices()
        if (!data.success) {
            return
        }

        setAccountOfficeData(data.data.data)
    }

    useEffect(() => {
        getAccountingOffices()
    }, [])

    return (
        <Page>
            <Box
                textAlign="center"
                width="full"
                height="full"
            >
                <HStack padding={5} alignItems="center">
                    <Box marginRight={2}>
                        <Icon
                            as={<MaterialIcons name="app-registration" />}
                            size="xl"
                        />
                    </Box>
                    <Box>
                        <Text
                            fontSize={20}
                            color="gray.500"
                            fontWeight={"bold"}
                        >
                            Cadastro de usuário
                        </Text>
                    </Box>
                </HStack>
                {/* <Heading size="xl" textAlign={"center"}>Cadastro</Heading> */}
                <ScrollView>
                    <VStack width="full" height={"full"} padding={5} space={2}>
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
                                maxLength={14}
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
                                maxLength={11}
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
                            <ControlledSelectInput
                                name="accountingOfficeId"
                                control={control}
                                placeholder="Choose Service"
                                dropdownIcon={
                                    accountOfficeLoading &&
                                    <Spinner accessibilityLabel="Loading posts" marginRight={5} />
                                }
                                data={accountOfficeData}
                                error={errors.accountingOfficeId}
                            />
                            {/* <Select
                                control={control}
                                placeholder="Choose Service"
                                dropdownIcon={
                                    accountOfficeLoading &&
                                    <Spinner accessibilityLabel="Loading posts" marginRight={5} />
                                }
                            >
                                {accountOfficeData.map((e, index) => {
                                    return <Select.Item key={index} label={e.name} value={e.id} />
                                })}
                            </Select> */}
                        </FormControl>

                        <Error>{actionError}</Error>
                        <Button
                            isLoading={loading}
                            marginTop={0}
                            height={50}
                            colorScheme="blue"
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