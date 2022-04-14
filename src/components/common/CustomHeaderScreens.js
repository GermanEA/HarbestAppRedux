import React, { useContext } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/theme/ThemeContext';


export const CustomHeaderScreens = ( { title, color, colorText, isSubtitle, subtitleText, marginBottom, icon, navigation } ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <View style={ styles.header }>
            <View style={{ 
                ...styles.headerContainer, 
                backgroundColor: color,
                marginBottom: marginBottom
            }}>
                <Pressable
                    onPress = { navigation }
                >
                    <View style={{ 
                        backgroundColor: theme.globalColors.primaryText,
                        padding: 5,
                        borderRadius: 50
                    }}>
                        <Icon
                            size={ theme.globalFontsSize.iconLarge }
                            name={ icon }
                            color={ color }     
                        />
                    </View>
                </Pressable>
                <View>
                    <Text style={{ ...styles.headerText, color: colorText, fontSize: theme.globalFontsSize.xxxlarge }}>{ title }</Text>
                    { 
                        ( isSubtitle )
                            ? <Text style={{ ...styles.headerSubtitleText, color: colorText, fontSize: theme.globalFontsSize.normal }}>{ subtitleText }</Text>
                            : null
                    }
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginHorizontal: -10,
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        marginLeft: 10
    },
    headerSubtitleText: {
        marginLeft: 10
    }
});
