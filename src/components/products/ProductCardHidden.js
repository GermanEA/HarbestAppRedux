import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/theme/ThemeContext';

export const ProductCardHidden = ( { id, sku, callbackDelete, callbackUpdate } ) => {

    const { theme } = useContext( ThemeContext );

    return (
        <View style={{ 
            ...styles.cardHiddenContainer, 
            backgroundColor: theme.globalColors.primaryText 
        }}>
            <TouchableOpacity
                onPress={ callbackUpdate }
                activeOpacity={ 0.9 }
                style={{ ...styles.btnContainer, backgroundColor: theme.globalColors.white }}
            >
                <Text style={{ fontSize: theme.globalFontsSize.small, color: theme.globalColors.primaryText }}>Actualizar</Text>
                <Icon
                    size={ theme.globalFontsSize.iconLarge }
                    name='sync'
                    color={ theme.globalColors.primaryText }
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={ callbackDelete }
                activeOpacity={ 0.9 }
                style={{ ...styles.btnContainer, backgroundColor: theme.globalColors.white }}
            >
                <Text style={{ fontSize: theme.globalFontsSize.small, color: theme.globalColors.primaryText }}>Borrar</Text>
                <Icon
                    size={ theme.globalFontsSize.iconLarge }
                    name='trash'
                    color={ theme.globalColors.primaryText }
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHiddenContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 5
    },
    btnContainer: {
        width: 80,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5
    },
});

