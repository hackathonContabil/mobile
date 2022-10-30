import { Box, Text } from 'native-base'
import { Card } from './style'

const TransactionCard = ({
    date,
    category,
    amount,
    payerName,
    operationType,
}) => {
    return <Box
        borderLeftColor={amount >= 0 ? "green.500" : "red.500"}
        borderLeftWidth={5}
        borderLeftRadius={3}
        padding={3}
        borderBottomColor="gray.300"
        borderBottomWidth={2}
        borderRightColor="gray.300"
        borderRightWidth={2}
        borderRightRadius={3}
        borderBottomRadius={3}
        margin={3}
    // rounded="lg"
    >
        <Text fontWeight="bold">{category}</Text>
        {payerName !== "Não classificado" && <Text color="gray.500">{payerName}</Text>}
        <Text color="gray.500">R$ {amount < 0 ? 0 - amount : amount}</Text>
        <Text color="gray.500">{operationType}</Text>
    </Box>
}

export default TransactionCard