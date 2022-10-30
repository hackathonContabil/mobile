import { useEffect, useState } from 'react';
import {
    NativeBaseProvider,
    VStack,
    HStack,
    Stack,
    Box,
    FormControl,
    Input,
    Heading,
    Icon,
    Button,
    Text,
    Select,
    Spinner
} from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ControlledInput, ControlledSelectInput } from '../../common/components/controlledInput';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Page from '../../common/components/page/Page'
import * as BankService from '../../services/bank/bankService'
import * as AccountingOfficeService from '../../services/accountingOffice/accountingOfficeService'
import { Error } from '../../common/components/error/styles'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
    user: yup.string().required("Informe o usuário"),
    password: yup.string().required("Informe a senha"),
    bank: yup.number().required("Informe o banco")
});

const AddBank = ({ navigation }) => {
    const [banksLoading, setBanksLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [actionError, setActionError] = useState('')
    const [banksData, setBanksData] = useState([])

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const addBank = async (data) => {
        setActionError('')
        setLoading(true)
        const response = await BankService.addBank(data)
        setLoading(false)

        if (!response.success) {
            setActionError(response.message)
            return
        }

        navigation.navigate('transactions')
    }

    const handleFormSubmit = (data) => {
        addBank(data)
    }

    const handleErrorSubmit = (data) => {
        // createUser(data)
    }

    const getBanks = async () => {
        const data = await BankService.getBanks()
        if (!data.success) {
            return
        }
        setBanksData(data.data.data)
    }

    useEffect(() => {
        getBanks()
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
                            as={<MaterialIcons name="account-balance" />}
                            size="xl"
                        />
                    </Box>
                    <Box>
                        <Text
                            fontSize={20}
                            color="gray.500"
                            fontWeight={"bold"}
                        >
                            Cadastro de instituição financeira
                        </Text>
                    </Box>
                </HStack>
                {/* <Heading size="xl" textAlign={"center"}>Cadastro de instituição financeira</Heading> */}
                <ScrollView>
                    <VStack width="full" height={"full"} padding={5} space={2}>
                        <FormControl isRequired>
                            <FormControl.Label marginTop={0}>
                                <Text fontSize={'md'}>Usuário</Text>
                            </FormControl.Label>
                            <ControlledInput
                                control={control}
                                name="user"
                                placeholder="Digite seu E-mail"
                                autoCapitalize="none"
                                error={errors.user}
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
                                <Text fontSize={'md'}>Banco</Text>
                            </FormControl.Label>
                            <ControlledSelectInput
                                name="bank"
                                control={control}
                                placeholder="Selecione o banco"
                                dropdownIcon={
                                    banksLoading &&
                                    <Spinner accessibilityLabel="Loading posts" marginRight={5} />
                                }
                                data={banksData}
                                error={errors.bank}
                            />

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

export default AddBank