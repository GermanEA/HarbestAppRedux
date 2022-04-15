import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Modal, Keyboard, Pressable, Text } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { SwipeListView } from 'react-native-swipe-list-view';

import { apiActionCreator, apiRecoverProduct, apiDeleteProduct, apiUpdateProduct, apiChangeFilterActive, apiCreateProduct } from '../redux/actions/apiActionsCreator';
import { ITEMS_PER_PAGE } from '../redux/constants/constants';
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
import { validationNumber } from '../helpers/validationNumber';

const HomeScreen = ({ navigation }) => {

    const { theme } = useContext( ThemeContext );
    const dispatch = useDispatch();
    const data = useSelector((state) => state.apiReducer.data);
    const toastMessage = useSelector((state) => state.apiReducer.toastMessage);
    const filterActive = useSelector((state) => state.apiReducer.filterActive);
    const loading = useSelector((state) => state.apiReducer.loading);
    const currentPage = useSelector((state) => state.apiReducer.currentPage);
    
    const URL_SEARCH = `?page=${ currentPage }&itemsPerPage=${ ITEMS_PER_PAGE }&active=`;
    const URL_RESET = `?page=0&itemsPerPage=${ ITEMS_PER_PAGE }&active=`;

    useEffect(() => {
        dispatch(apiActionCreator(`${ URL_SEARCH + filterActive }`));
    }, []);    


    useEffect(() => {
        console.log({toastMessage})
        if( toastMessage != '' ) 
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: toastMessage
            });

      }, [toastMessage])

    const initProductCreate = {
        SKU: '',
        name: '',
        description: '',
        active: true,
        price: ''
    };
    
    const [searchFormState, setSearchFormState] = useState({ principal: '' });

    const [modalVisibleCreate, setModalVisibleCreate] = useState(false);
    const [isEnabledCreate, setIsEnabledCreate] = useState(true);
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
    
    const [formCreate, setFormCreate] = useState(initProductCreate);

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
        dispatch(apiActionCreator(`${ URL_SEARCH + filterActive }`));
    }

    const handleOnPressUpdate = (product) => {
        setProductUpdate(product);
        setModalVisible(true);
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const toggleSwitchCreate = () => setIsEnabledCreate(previousState => !previousState);

    const handleUpdateProduct = () => {
        Keyboard.dismiss();

        const validationPrice = validationNumber(priceForm);

        if( !validationPrice ) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Debes introducir un número válido como precio',
                topOffset: 5
            });

            return;
        }

        const productToUpdate = {
            SKU: productUpdate.SKU,
            _id: productUpdate._id,
            active: isEnabled,
            name: nameForm,
            description: descriptionForm,
            price: parseFloat(priceForm)
        } 

        dispatch(apiUpdateProduct(`/${ productUpdate._id }`, productToUpdate));
        dispatch(apiActionCreator(`${ URL_SEARCH + filterActive }`));

        setModalVisible(false);
    }

    const handleCreateProduct = () => {
        Keyboard.dismiss();

        if( formCreate.SKU === '' || formCreate.name === '' || formCreate.description === '' || formCreate.price === '' ) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Debes rellenar todos los campos',
                topOffset: 5
            });

            return;
        }

        const validationPrice = validationNumber(formCreate.price);

        if( !validationPrice ) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Debes introducir un número válido como precio',
                topOffset: 5
            });

            return;
        }

        setModalVisibleCreate(!modalVisibleCreate);

        const productToCreate = {
            SKU: formCreate.SKU,
            _id: '',
            active: isEnabledCreate,
            name: formCreate.name,
            description: formCreate.description,
            price: parseFloat(formCreate.price)
        }

        dispatch(apiCreateProduct(productToCreate));
        dispatch(apiActionCreator(`${ URL_SEARCH + filterActive }`));
        setFormCreate(initProductCreate);
    }

    const handleOnPressFilterActive = () => {
        dispatch(apiChangeFilterActive(!filterActive, `${ URL_RESET + !filterActive }`))
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

                <CustomSwitch
                    name={ filterActive ? 'Activado' : 'Desactivado' }
                    trackColor={{ false: theme.globalColors.greyLight, true: theme.globalColors.primary }}
                    thumbColor={ filterActive ? theme.globalColors.primaryText : theme.globalColors.greyMedium }
                    ios_backgroundColor={ theme.globalColors.primaryText }
                    onValueChange={ handleOnPressFilterActive }
                    value={ filterActive }
                />

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

                { 
                    !loading
                        ? <Pagination 
                            currentPage={ currentPage }
                            ITEMS_PER_PAGE= { ITEMS_PER_PAGE }
                            filterActive={ filterActive }
                            data={ data }
                        />
                        : null
                }

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

                <View style={ styles.btnCreateSticky }>
                    <Pressable 
                        onPress={ () => setModalVisibleCreate(true) }
                        style={{ ...styles.btnCreate, backgroundColor: theme.globalColors.successText }}
                    >
                        <Text style={{ color: theme.globalColors.white }}>Añadir</Text>
                    </Pressable>
                </View>

                { 
                    modalVisibleCreate 
                        ? <Modal
                            animationType="slide"
                            transparent={ true }
                            visible={ modalVisibleCreate }
                            onRequestClose={ () => {
                                setModalVisible(!modalVisibleCreate);
                            }}
                        >
                            <View style={ styles.centeredView }>
                                <View style={ styles.modalView }>
                                    <Text style={styles.modalText}>Crea un nuevo producto</Text>
                                    <CustomInput 
                                        name='Código SKU'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, SKU: value }) }
                                        pass={ false }
                                        value={ formCreate.SKU }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Nombre'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, name: value }) }
                                        pass={ false }
                                        value={ formCreate.name }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Descripción'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, description: value }) }
                                        pass={ false }
                                        value={ formCreate.description }
                                        style={ styles.inputWidth }
                                        keyboard='default'
                                    />
                                    <CustomInput 
                                        name='Precio'
                                        handleOnChange={ (value) => setFormCreate({ ...formCreate, price: value }) }
                                        pass={ false }
                                        value={ formCreate.price }
                                        style={ styles.inputWidth }
                                        keyboard='decimal-pad'
                                    />
                                    <CustomSwitch
                                        name={ isEnabledCreate ? 'Activado' : 'Desactivado' }
                                        trackColor={{ false: theme.globalColors.greyLight, true: theme.globalColors.primary }}
                                        thumbColor={ isEnabled ? theme.globalColors.primaryText : theme.globalColors.greyMedium }
                                        ios_backgroundColor={ theme.globalColors.primaryText }
                                        onValueChange={ toggleSwitchCreate }
                                        value={ isEnabledCreate }
                                    />
                                    <View style={ styles.btnWrapper }>
                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => setModalVisibleCreate(false) }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Cerrar</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: theme.globalColors.primaryText }}
                                            onPress={ () => handleCreateProduct() }
                                        >
                                            <Text style={{ ...styles.textStyle, backgroundColor: theme.globalColors.primaryText }}>Crear</Text>
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