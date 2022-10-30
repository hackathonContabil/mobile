import { Box } from 'native-base'
import { StatusBar } from 'react-native';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

const Page = ({ children }) => {
    return <Box
        marginTop={StatusBar.currentHeight}
        // padding={5}
        bgColor="gray.100"
        // height={"full"}
    >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        {/* <KeyboardAvoidingView enabled> */}
        {children}
        {/* </KeyboardAvoidingView> */}
        {/* </TouchableWithoutFeedback> */}
    </Box >
}

export default Page