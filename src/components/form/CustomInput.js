import React, { useContext } from 'react'
import { KeyboardTypeOptions, Text, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';

export const CustomInput = ( { name, placeholder, keyboard, pass, value, length, autoCapitalize, multiline, numberLines, style, handleOnChange } ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <>
            {
                name &&
                    <Text style={{ ...styles.inputName, color: theme.globalColors.primaryText, fontSize: theme.globalFontsSize.large }}>{ name }</Text>
            }

            <TextInput 
                style={[ 
                    { ...styles.input, borderColor: theme.globalColors.greyMedium },
                    multiline ? styles.inputTextTop : null,
                    style
                ]}
                placeholder={ placeholder }
                placeholderTextColor= 'grey'
                keyboardType={ keyboard }
                selectionColor={ theme.globalColors.primary }
                autoCapitalize={ autoCapitalize }
                autoCorrect={ false }
                secureTextEntry={ pass }
                onChangeText={ handleOnChange }
                value={ value }
                maxLength={ length }
                multiline={ multiline }
                numberOfLines={ numberLines }
            />
        </>
    )
}

const styles = StyleSheet.create({
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
