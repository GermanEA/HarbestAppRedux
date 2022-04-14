import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Modal, Keyboard, Pressable, Text } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { SwipeListView } from 'react-native-swipe-list-view';

import { apiActionCreator, apiRecoverProduct, apiDeleteProduct, apiUpdateProduct } from '../redux/actions/apiActionsCreator';
import { ThemeContext } from '../context/theme/ThemeContext';
import { CustomHeaderScreens } from '../components/common/CustomHeaderScreens';
import { CatalogueSearcher } from '../components/catalogue/CatalogueSearcher';
import { CustomSwitch } from '../components/form/CustomSwitch';
import { CustomActivityIndicator } from '../components/common/CustomActivityIndicator';
import { EmptyListMessage } from '../components/common/EmptyListMessage';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCardHidden } from '../components/products/ProductCardHidden';
import { Pagination } from '../components/pagination/Pagination';
import { CustomInput } from '../components/form/CustomInput';

const HomeScreen = ({ navigation }) => {

    useEffect(() => {
        dispatch(apiActionCreator('?page=0&itemsPerPage=5&active=true'));
    }, []);

    const { theme } = useContext( ThemeContext );
    const dispatch = useDispatch();
    const data = useSelector((state) => state.apiReducer.data);
    const loading = useSelector((state) => state.apiReducer.loading);

    
    const [searchFormState, setSearchFormState] = useState({ principal: '' });

    const [modalVisible, setModalVisible] = useState(false);
    const [productUpdate, setProductUpdate] = useState({
        SKU: '',
        name: '',
        description: '',
        active: true,
        price: 0
    });

    const [isEnabled, setIsEnabled] = useState(true);

    const [nameForm, setNameForm] = useState('');
    const [descriptionForm, setDescriptionForm] = useState('');
    const [priceForm, setPriceForm] = useState('');    

    useEffect(() => {
        setNameForm(productUpdate.name);
        setDescriptionForm(productUpdate.description);
        setPriceForm(productUpdate.price.toFixed(2));
        setIsEnabled(productUpdate.active);
    }, [productUpdate])

    const handleOnPressSearchingPrincipal = () => {
        if( searchFormState.principal === '' ) {

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Debes rellenar el texto de búsqueda'
            });
        } else {
            dispatch(apiRecoverProduct(`/${ searchFormState.principal }`))
            setSearchFormState({ principal: '' });
        }
    }

    const handleOnPressDelete = (id) => {
        dispatch(apiDeleteProduct(`/${ id }`));
        dispatch(apiActionCreator('?page=0&itemsPerPage=5&active=true'));
    }

    const handleOnPressUpdate = (product) => {
        setProductUpdate(product);
        setModalVisible(true);
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleUpdateProduct = (product) => {

        const productToUpdate = {
            SKU: productUpdate.SKU,
            _id: productUpdate._id,
            active: isEnabled,
            name: nameForm,
            description: descriptionForm,
            price: parseFloat(priceForm)
        } 

        dispatch(apiUpdateProduct(`/${ productUpdate._id }`, productToUpdate));
        dispatch(apiActionCreator('?page=0&itemsPerPage=5&active=true'));

        setModalVisible(false);
    }

    return (
        <SafeAreaView style={{ ...styles.globalContainer, backgroundColor: theme.globalColors.white }}>
            <View style={ styles.globalWrapper }>
                <CustomHeaderScreens
                    title='Listado de Productos'
                    color={ theme.globalColors.primary }
                    colorText={ theme.globalColors.primaryText }
                    navigation={ () => {} }
                    isSubtitle={ true }
                    subtitleText='Relación de productos'
                    marginBottom={ 10 }
                    icon='create-outline'
                />

                <CatalogueSearcher
                    placeholder='Inserta un ID de producto'
                    value={ searchFormState.principal }
                    handleOnChange={ (value) => setSearchFormState({ ...searchFormState, principal: value }) }
                    handleOnPress={ handleOnPressSearchingPrincipal }
                    handleOnPressCamera={ () => {} }
                />

                {/* <CustomSwitch
                    name={ filterActive ? 'Activado' : 'Desactivado' }
                    trackColor={{ false: theme.globalColors.greyLight, true: theme.globalColors.primary }}
                    thumbColor={ filterActive ? theme.globalColors.primaryText : theme.globalColors.greyMedium }
                    ios_backgroundColor={ theme.globalColors.primaryText }
                    onValueChange={ changeFilterActive }
                    value={ filterActive }
                /> */}

                {/* Listado de productos */}
                <View style={{ flex: 1 }}>
                {
                    ( loading )
                        ? <CustomActivityIndicator
                            style={{ position: 'absolute', alignSelf: 'center' }}
                            size={ 50 }
                        />
                        : <SwipeListView
                            keyExtractor= { (item, index) => item._id }
                            style={{ marginTop: 5 }}
                            showsVerticalScrollIndicator={ false }
                            ListEmptyComponent={ () => <EmptyListMessage message='No hay productos' /> }
                            data={ data.list }
                            renderItem={ (item) => 
                                <ProductCard 
                                    key={ item.item.SKU }
                                    item={ item.item } 
                                    handleOnPress={ () => navigation.navigate('ProductDetailsScreen', { product: item.item }) }
                                />
                            }
                            renderHiddenItem={ (item) => 
                                <ProductCardHidden
                                    id={ item.item._id }
                                    sku={ item.item.SKU }
                                    callbackUpdate={ () => handleOnPressUpdate(item.item) }
                                    callbackDelete={ () => handleOnPressDelete(item.item._id) }
                                />
                            }
                            leftOpenValue={ 100 }
                            stopLeftSwipe={ 120 }
                            rightOpenValue={ -100 }
                            stopRightSwipe={ -120 }
                        />
                }
                </View>

                {/* <Pagination 
                    isEnabled={ isEnabled }
                /> */}

                { 
                    modalVisible 
                        ? <Modal
                            animationType="slide"
                            transparent={ true }
                            visible={ modalVisible }
                            onRequestClose={ () => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={ styles.centeredView }>
                                <View style={ styles.modalView }>
                                    <Text style={styles.modalText}>Actualiza el siguiente producto</Text>
                                    <Text style={styles.modalTextSku}>{ productUpdate.SKU }</Text>
                                    <CustomInput 
                                        name='Nombre'
                                        handleOnChange={ setNameForm }
                                        pass={ false }
                                        value={ nameForm }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Descripción'
                                        handleOnChange={ setDescriptionForm }
                                        pass={ false }
                                        value={ descriptionForm }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Precio'
                                        handleOnChange={ setPriceForm }
                                        pass={ false }
                                        value={ priceForm }
                                        style={ styles.inputWidth }
                                        keyboard='decimal-pad'
                                    />
                                    <CustomSwitch
                                        name={ isEnabled ? 'Activado' : 'Desactivado' }
                                        trackColor={{ false: theme.globalColors.greyLight, true: theme.globalColors.primary }}
                                        thumbColor={ isEnabled ? theme.globalColors.primaryText : theme.globalColors.greyMedium }
                                        ios_backgroundColor={ theme.globalColors.primaryText }
                                        onValueChange={ toggleSwitch }
                                        value={ isEnabled }
                                    />
                                    <View style={ styles.btnWrapper }>
                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => setModalVisible(false) }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Cerrar</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => handleUpdateProduct() }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Actualizar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    : null
                }

            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1
    },
    globalWrapper: {
        flex: 1,
        marginHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        flex: 1,
        textAlign: 'center',
        margin: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalTextSku: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputWidth: {
        width: 300
    },
    btnWrapper: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnCreateSticky: {
        width: 100,
        height: 40,
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 15,
        marginRight: 10,
        zIndex: 2,        
        backgroundColor: 'transparent'
    },
    btnCreate: {
        flex: 1,
        textAlign: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    paginationRow: {
        width: '33%',
        alignItems: 'center'
    }
});