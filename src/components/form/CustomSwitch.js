import React, { useContext } from 'react'
import { Text, StyleSheet, ColorValue, View, Switch } from 'react-native';
// import { Switch } from 'react-native-gesture-handler';

import { ThemeContext } from '../../context/theme/ThemeContext';

export const CustomSwitch = ( { name, trackColor, thumbColor, ios_backgroundColor, value, onValueChange } ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <View style={ styles.wrapper }>
            {
                name &&
                    <Text style={{ ...styles.inputName, color: theme.globalColors.primaryText, fontSize: theme.globalFontsSize.large }}>{ name }</Text>
            }

            <Switch
                trackColor={ trackColor }
                thumbColor={ thumbColor }
                ios_backgroundColor={ ios_backgroundColor }
                onValueChange={ onValueChange }
                value={ value }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    inputName: {
        marginBottom: 5
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },
    inputTextTop: {
        textAlignVertical: 'top'
    }
});
