import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, LOADING_ITEMS } from '../actions/types';

const initialState = {
    items: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case EDIT_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case LOADING_ITEMS:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}