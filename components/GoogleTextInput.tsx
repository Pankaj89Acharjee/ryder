import { GoogleInputProps } from '@/types/type'
import React from 'react'
import { Text, View } from 'react-native'

const GoogleTextInput = ({ icon, initialLocation, containerStyle, handlePress, }: GoogleInputProps) => {


    return (
        <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}>
            <Text>Google Place Select</Text>
        </View>
    )
}

export default GoogleTextInput