import React, { useContext, useEffect, useState } from 'react';
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
import { Context } from '../../common/context/context';
import * as AuthService from '../../services/auth/authService'

const Permission = ({ navigation }) => {
    const { setIsAuth, setIsSharingBankAccountData } = useContext(Context)

    const onAccept = async () => {
        // const data = { success: true }
        const data = await AuthService.allowShareAccountData()
        if (!data.success) {
            setIsAuth(false)
            return
        }

        setIsSharingBankAccountData(true)
    }

    const onRefuse = () => {
        setIsAuth(false)
    }

    return (
        <Page>
            <Box
                textAlign="center"
                width="full"
                height="full"
            >
                <VStack padding={5} alignItems="center">
                    <HStack marginRight={2} marginBottom={10}>
                        <Box marginRight={2}>
                            <Icon
                                as={<MaterialIcons name="verified-user" />}
                                size="xl"
                            />
                        </Box>
                        <Box>
                            <Text
                                fontSize={20}
                                color="gray.500"
                                fontWeight={"bold"}
                            >
                                Segurança e privacidade
                            </Text>
                        </Box>
                    </HStack>
                    <VStack space={5}>
                        <Box>
                            <Text
                                fontSize={18}
                                fontWeight="semibold"
                                color={"gray.600"}
                            >
                                Nos importamos muito com sua privacidade e segurança.
                                Este aplicativo utiliza seus dados bancários para consultar informações
                                referentes as suas transações financeiras.
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize={18}
                                fontWeight="semibold"
                                color={"gray.600"}
                            >
                                Todos os seus dados são criptografados em nossa base de dados.
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize={18}
                                fontWeight="semibold"
                                color={"gray.600"}
                            >
                                Para utilizar o aplicativo, é necessário conceder permissão para
                                utilizar e consultar seus dados bancários.
                            </Text>
                        </Box>
                    </VStack>
                </VStack>

                <VStack padding={5} space={5}>
                    <Button
                        // isLoading={loading}
                        marginTop={0}
                        height={50}
                        colorScheme="red"
                        fontWeight={'bold'}
                        onPress={() => onRefuse()}
                    >
                        Recusar
                    </Button>
                    <Button
                        // isLoading={loading}
                        marginTop={0}
                        height={50}
                        colorScheme="blue"
                        fontWeight={'bold'}
                        onPress={() => onAccept()}
                    >
                        Autorizar
                    </Button>
                </VStack>
            </Box>
        </Page >
    );
}

export default Permission