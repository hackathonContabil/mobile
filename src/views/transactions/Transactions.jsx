import { useContext, useEffect, useState } from 'react';
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

import TransactionCard from '../../common/components/transactionCard/TransactionCard'

import { MaterialIcons } from '@expo/vector-icons'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ControlledInput, ControlledSelectInput } from '../../common/components/controlledInput';
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
    SafeAreaView,
    FlatList
} from 'react-native';
import Page from '../../common/components/page/Page'
import * as BankService from '../../services/bank/bankService'
import TotalCard from '../../common/components/totalCard/TotalCard'
import { Context } from '../../common/context/context';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const RegExpNumberedCaptureGroups = /([0-9]{4})-([0-9]{2})-([0-9]{2})/

const schema = yup.object({
    from: yup.string(),
    to: yup.string()
});

const Transactions = ({ navigation }) => {
    const { setIsAuth } = useContext(Context)
    const [transactionsData, setTransactionsData] = useState([])
    const [balanceData, setBalanceData] = useState([])
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [dateFilter, setDateFilter] = useState({ from: null, to: null })

    const getTransactions = async () => {
        const response = await BankService.getTransactions()
        if (!response.success) {
            return
        }
        // console.log(response.data.data.transactions.transactions.length)
        setTransactionsData(response.data.data.transactions.transactions)
    }

    const getBalance = async () => {
        const response = await BankService.getBalance()
        if (!response.success) {
            return
        }
        setBalanceData(response.data.data.balance)
    }

    const handleDateTo = (value) => {
        setDateFilter({ ...dateFilter, to: value })
    }

    const handleDateFrom = (value) => {
        setDateFilter({ ...dateFilter, from: value })
    }

    const getData = () => {
        getTransactions()
        getBalance()
    }

    const logOut = () => {
        setIsAuth(false)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Page>
            <VStack height="full">
                <Box bgColor={"blue.500"} height={200}>
                    <HStack justifyContent={"space-between"}>
                        <Box padding={5}>
                            <Text
                                fontSize={25}
                                color="white"
                                fontWeight="bold"
                            >
                                Olá, empresário(a) !
                            </Text>
                        </Box>
                        <HStack justifyContent="center" alignItems={"center"} marginRight={2}>
                            <Icon
                                as={
                                    <MaterialIcons name="refresh" />
                                }
                                size={"xl"}
                                color="white"
                                marginRight={2}
                                onPress={() => getData()}
                            />
                            <Icon
                                as={
                                    <MaterialIcons name="logout" />
                                }
                                size={"xl"}
                                color="white"
                                marginRight={2}
                                onPress={() => logOut()}
                            />
                        </HStack>
                    </HStack>
                    <TotalCard balance={balanceData} />
                </Box>
                <Box marginLeft={3} marginBottom={0} marginTop={1}>
                    <Text
                        fontWeight={"bold"}
                        color="gray.500"
                        fontSize={18}
                    >Transações financeiras
                    </Text>
                </Box>
                <Box marginLeft={3} marginRight={3} marginTop={2}>
                    <HStack
                        justifyContent={"center"}
                        space={3}
                        paddingLeft={2}
                        paddingRight={2}
                    >
                        <Box width="50%">
                            <FormControl isRequired>
                                <Input
                                    bgColor={"white"}
                                    name="from"
                                    placeholder="Data inical"
                                    autoCapitalize="none"
                                    value={dateFilter.from}
                                    onChangeText={handleDateFrom}
                                    rightElement={
                                        <Icon
                                            as={
                                                <MaterialIcons name="calendar-today" />
                                            }
                                            marginRight={2}
                                        />
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box width="50%">
                            <FormControl isRequired>
                                <Input
                                    bgColor={"white"}
                                    control={control}
                                    name="to"
                                    placeholder="Data final"
                                    autoCapitalize="none"
                                    value={dateFilter.to}
                                    onChangeText={handleDateTo}
                                    rightElement={
                                        <Icon
                                            as={
                                                <MaterialIcons name="calendar-today" />
                                            }
                                            marginRight={2}
                                        />
                                    }
                                />
                            </FormControl>
                        </Box>
                    </HStack>
                </Box>
                <Box
                    bgColor={"white"}
                    marginTop={3}
                    marginLeft={3}
                    marginRight={3}
                    marginBottom={10}
                    borderRadius={5}
                    maxHeight={460}
                >
                    <SafeAreaView>
                        <FlatList
                            data={transactionsData}
                            renderItem={
                                ({ item }) => {
                                    return <TransactionCard
                                        category={item.category}
                                        date={item.name}
                                        amount={item.amount}
                                        payerName={item.payerName}
                                        operationType={item.operationType}
                                    />
                                }
                            }
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </Box>
            </VStack>
        </Page >
    );
}

export default Transactions