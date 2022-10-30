import { useState } from 'react';
import {
    NativeBaseProvider,
    VStack,
    Box,
    FormControl,
    Input,
    Heading,
    Icon,
    Button,
    HStack,
    Avatar,
    Text
} from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

const Welcome = ({ navigation }) => {
    const [show, setShow] = useState(false);

    return (
        <Box
            alignItems="center"
            justifyContent="center"
            height="full"
            textAlign="center"
            width="full"
        >
            <VStack padding={5} alignItems="center" justifyContent={"center"}>
                <Box>
                    <Text
                        fontSize={30}
                        color="gray.500"
                        fontWeight={"bold"}
                    >
                        Seja bem vindo(a) !
                    </Text>
                </Box>
                <Box>
                    <Text
                        fontSize={20}
                        color="gray.400"
                        fontWeight={"bold"}
                    >
                        O que deseja fazer ?
                    </Text>
                </Box>
            </VStack>
            {/* <Heading size="xl">Seja Bem Vindo!</Heading> */}
            <VStack width="full" padding={5} space={5}>
                <Button
                    height={50}
                    colorScheme="blue"
                    fontWeight={'bold'}
                    // fontSize={900}
                    onPress={() => navigation.navigate('login')}
                >
                    Entrar
                </Button>
                <Button
                    height={50}
                    colorScheme="blue"
                    fontWeight={'bold'}
                    // fontSize={900}
                    onPress={() => navigation.navigate('register')}
                >
                    Criar conta
                </Button>
            </VStack>
        </Box>
    );
}

export default Welcome