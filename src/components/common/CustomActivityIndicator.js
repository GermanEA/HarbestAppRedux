import React, { useContext } from 'react'
import { StyleProp, ViewStyle, View, ActivityIndicator } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';

export const CustomActivityIndicator = ( { style, size = 100, dark = true } ) => {

    const { theme } = useContext( ThemeContext );

    const color = theme.globalColors.primaryText;

    return (
        <View style={[ style, { flex: 1, justifyContent: 'center', alignContent: 'center'}]}>
            <ActivityIndicator color={ color } size={ size }/>
        </View>
    )
}
