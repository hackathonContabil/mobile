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

import Page from '../../common/components/page/Page'

import { MaterialIcons } from '@expo/vector-icons'

export default function Home() {
    const [show, setShow] = useState(false);

    return (
        <Page>
            <Box
                height="full"
                width="full"
            >
                <Text>home</Text>
            </Box>
        </Page>
    );
}