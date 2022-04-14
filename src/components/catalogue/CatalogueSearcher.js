import React, { useContext } from 'react'
import { Platform, View, StyleSheet, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { CustomInput } from '../form/CustomInput';

export const CatalogueSearcher = ( props ) => {

    const { placeholder, keyboard, pass, value, length, autoCapitalize, handleOnChange, handleOnPress, handleOnPressCamera } = props;
    const { theme } = useContext( ThemeContext );

    return (
        <View style={ { ...styles.container, backgroundColor: theme.globalColors.primary } }>
            
            <Pressable
                onPress={ handleOnPressCamera }
                style={ styles.button }
            >
                <Icon
                    name='camera-outline'
                    size={ theme.globalFontsSize.iconLarge30 }
                    color={ theme.globalColors.primaryText }
                    style={ styles.icon }
                />
            </Pressable>

            <Pressable
                onPress={ handleOnPress }
                style={ styles.button }
            >
                <Icon
                    name='search'
                    size={ theme.globalFontsSize.iconLarge30 }
                    color={ theme.globalColors.primaryText }
                    style={ styles.icon }
                />
            </Pressable>

            <View
                style={[ 
                    { ...styles.input },
                    ( Platform.OS === 'ios') && styles.inputIOS
                ]}
            >
                <CustomInput
                    handleOnChange={ handleOnChange }
                    pass={ pass ? pass : false }
                    value= { value }
                    placeholder={ placeholder }
                    keyboard={ keyboard ? keyboard : 'default' }
                    length={ length }
                    autoCapitalize={ autoCapitalize }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -10,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: -16,
    },
    input: {
        flex: 1,
        color: 'black',
        margin: 5,
        marginBottom: 0,
        paddingVertical: 5
    },
    inputIOS:{
        // Dar estilos en IOS al subrayado
    },
    icon: {
        marginRight: 10
    },
    button: {
        marginTop: 10
    }
});
