import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/theme/ThemeContext';

export const EmptyListMessage = ( { message } ) => {
    const { theme } = useContext( ThemeContext );

    return (
        <View style={ styles.container }>
            <Icon
                name='eye-off-outline'
                size={ theme.globalFontsSize.iconXtraLarge }
                color={ theme.globalColors.primaryText }
            />
            <Text style={{ color: theme.globalColors.primaryText, fontSize: theme.globalFontsSize.normal }}>{ message }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
