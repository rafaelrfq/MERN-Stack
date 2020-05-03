import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, LOADING_ITEMS } from './types';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading);
    axios.get('/api/items').then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data
    }))
};

export const deleteItem = (id) => dispatch => {
    axios.delete(`/api/items/${id}`).then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
};

export const addItem = (item) => dispatch => {
    axios.post('/api/items', item).then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    }))
};

export const editItem = (id, item) => dispatch => {
    axios.put(`/api/items/${id}`, item).then(res => dispatch({
        type: EDIT_ITEM,
        payload: res.data
    }))
};

export const setItemsLoading = () => {
    return {
        type: LOADING_ITEMS
    };
};