import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import {fetchData, fetchSuccess, fetchError, recoverProduct, deleteProduct, updateProduct} from './apiActions';

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
        console.log(error);
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
                console.log(error);
            });
    });
}

export const apiDeleteProduct = (url) => (dispatch) => {
    dispatch(deleteProduct());
    return new Promise(() => {
        axios
            .delete(BASE_URL + url)
            .then((response) => {
                dispatch(fetchSuccess(response.data))
            })
            .catch((error) => {
                dispatch(fetchError(error));
                console.log(error);
            });
    });
}

export const apiUpdateProduct = (url, { _id, name, description, active, price }) => (dispatch) => {
    dispatch(updateProduct());
    return new Promise(() => {
        axios
            .put(BASE_URL + url, { name, description, active: active + '', price })
            .then((response) => {
                dispatch(fetchSuccess(response.data))
            })
            .catch((error) => {
                dispatch(fetchError(error));
                console.log(error);
            });
    });
}

// export default apiActionCreator;