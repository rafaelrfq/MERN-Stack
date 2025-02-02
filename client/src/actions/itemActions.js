import axios from 'axios';
import {tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, LOADING_ITEMS } from './types';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading);
    axios.get('/api/items').then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = (item) => (dispatch, getState) => {
    axios.post('/api/items', item, tokenConfig(getState)).then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const editItem = (id, item) => (dispatch, getState) => {
    axios.put(`/api/items/${id}`, item, tokenConfig(getState)).then(res => dispatch({
        type: EDIT_ITEM,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
    return {
        type: LOADING_ITEMS
    };
};