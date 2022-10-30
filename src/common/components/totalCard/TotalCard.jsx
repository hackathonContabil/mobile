import React, { useState } from 'react'
import { Box, Text, HStack, Stack, VStack } from 'native-base'
import { Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

const TotalCard = ({ balance }) => {
    const [show, setShow] = useState(false)


    return <Box
        borderLeftColor={"green.500"}
        borderLeftWidth={5}
        borderLeftRadius={3}
        paddingLeft={3}
        paddingRight={3}
        paddingBottom={2}
        paddingTop={2}
        borderRadius={5}
        margin={3}
        bgColor="white"
    >
        <HStack justifyContent={"space-between"}>
            <Stack>
                <Text fontWeight={"bold"} color="gray.500">Saldo geral</Text>
                <Text fontWeight={"bold"} fontSize={18}>
                    {show ? `R$ ${balance || '00,00'}` : "R$ ******"}
                </Text>
            </Stack>
            <VStack justifyContent="center">
                <Icon
                    as={<MaterialIcons name={
                        show ? 'visibility' : 'visibility-off'
                    } />}
                    size="lg"
                    onPress={() => setShow(!show)}
                />
            </VStack>
        </HStack>
    </Box>
}

export default TotalCard