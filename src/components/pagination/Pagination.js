import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ApiContext } from '../../context/api/ApiContext';
import { ThemeContext } from '../../context/theme/ThemeContext';

export const Pagination = ( { isEnabled } ) => {

    const { theme } = useContext( ThemeContext );
    const { productList, currentPage, recoverProductListInit } = useContext(ApiContext);

    return (
        <View style={ styles.paginationContainer }>
            <View style={ styles.paginationRow }>
            {
                currentPage > 0
                    ? <Pressable
                        onPress={ () => recoverProductListInit( isEnabled, currentPage - 1 ) }
                        style={{ ...styles.btn, backgroundColor: theme.globalColors.primaryText }}
                    >
                        <Text style={{ color: theme.globalColors.white }}>Anterior</Text>
                    </Pressable>
                    : null
            }
            </View>

            <View style={ styles.paginationRow }>
                <Text>Página { currentPage + 1 }</Text>
            </View>

            <View style={ styles.paginationRow }>
            {
                productList.nextPage > 0
                    ? <Pressable
                        onPress={ () => recoverProductListInit( isEnabled, currentPage + 1 ) }
                        style={{ ...styles.btn, backgroundColor: theme.globalColors.primaryText }}
                    >
                        <Text style={{ color: theme.globalColors.white }}>Próxima</Text>
                    </Pressable>
                    : null
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({    
    paginationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    paginationRow: {
        width: '33%',
        alignItems: 'center',
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5
    }
});