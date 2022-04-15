import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import {fetchData, fetchSuccess, fetchError, recoverProduct, deleteProduct, updateProduct, createProduct, changeFilterActive, changePagination, toastMessage} from './apiActions';

export const apiActionCreator = (url) => (dispatch) => {
    dispatch(fetchData());
    return new Promise(() => {
        axios
        .get(BASE_URL + url)
        .then((response) => {
            dispatch(fetchSuccess(response.data));
        })
        .catch((error) => {
            dispatch(fetchError(error));
        });
    });
};

export const apiRecoverProduct = (url) => (dispatch) => {
    dispatch(fetchData());
    return new Promise(() => {
        axios
            .get(BASE_URL + url)
            .then((response) => {
                dispatch(recoverProduct(response.data))
            })
            .catch((error) => {
                dispatch(fetchError(error));
            });
    });
}

export const apiDeleteProduct = (url) => (dispatch) => {
    dispatch(deleteProduct());
    return new Promise(() => {
        axios
            .delete(BASE_URL + url)
            .then((response) => {
                dispatch(toastMessage('Producto borrado correctamente'));
                dispatch(toastMessage(''));
            })
            .catch((error) => {
                dispatch(fetchError(error));
            });
    });
}

export const apiUpdateProduct = (url, { _id, name, description, active, price }) => (dispatch) => {
    dispatch(updateProduct());
    return new Promise(() => {
        axios
            .put(BASE_URL + url, { name, description, active: active + '', price })
            .then((response) => {
                dispatch(toastMessage('Producto actualizado correctamente'));
                dispatch(toastMessage(''));
            })
            .catch((error) => {
                dispatch(fetchError(error));
            });
    });
}

export const apiCreateProduct = ({ _id, name, description, active, price, SKU }) => (dispatch) => {
    dispatch(createProduct());
    return new Promise(() => {
        axios
            .post(BASE_URL, { name, description, active: active + '', price, SKU })
            .then((response) => {
                dispatch(toastMessage('Producto creado correctamente'));
                dispatch(toastMessage(''));
            })
            .catch((error) => {
                dispatch(fetchError(error));
            });
    });
}

export const apiChangeFilterActive = (filterActive, url) => (dispatch) => {
    dispatch(changeFilterActive(filterActive));
    return new Promise(() => {
        axios
            .get(BASE_URL + url)
            .then((response) => {
                dispatch(fetchSuccess(response.data))
            })
            .catch((error) => {
                dispatch(fetchError(error));
            });
    });
}

export const apiChangePagination = (page, url) => (dispatch) => {
    dispatch(changePagination(page));
    console.log('pagin: ' + url)
    return new Promise(() => {
        axios
            .get(BASE_URL + url)
            .then((response) => {
                dispatch(fetchSuccess(response.data))
            })
            .catch((error) => {
                dispatch(fetchError(error));
            });
    });
}