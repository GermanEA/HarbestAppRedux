import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { apiChangePagination } from '../../redux/actions/apiActionsCreator';

export const Pagination = ({ currentPage, ITEMS_PER_PAGE, filterActive, data }) => {

    const { theme } = useContext( ThemeContext );

    const dispatch = useDispatch();

    const recoverProductListInit = (previousPage) => {
        previousPage
            ? dispatch(apiChangePagination(currentPage + 1, `?page=${ currentPage + 1 }&itemsPerPage=${ ITEMS_PER_PAGE }&active=${ filterActive }`))
            : dispatch(apiChangePagination(currentPage - 1, `?page=${ currentPage - 1 }&itemsPerPage=${ ITEMS_PER_PAGE }&active=${ filterActive }`))
    }

    return (
        <View style={ styles.paginationContainer }>
            <View style={ styles.paginationRow }>
            {
                currentPage > 0
                    ? <Pressable
                        onPress={ () => recoverProductListInit( false ) }
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
                data.nextPage > 0
                    ? <Pressable
                        onPress={ () => recoverProductListInit( true ) }
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