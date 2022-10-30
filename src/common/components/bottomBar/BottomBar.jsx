import React, { useState } from "react"
import { Box, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

const BottomBar = () => {
    const [activeIcon, setActiveIcon] = useState([])

    const isActive = (id) => {
        return activeIcon == id
    }

    const onClick = (id) => {
        setActiveIcon(id)
    }

    return (
        <Box>
            <Box bgColor={"gray.200"} height={60} style={{
            }}>
                <Icon
                    as={<MaterialIcons name={"home-filled"} />}
                    // mr={4}
                    size="xl"
                    color={isActive('home')}
                // onPress={() => setShow(!show)}
                />
            </Box>

        </Box>
    )
}

export default BottomBar