import axios from "axios";

export const GET_PRODUCTS_START = 'GET_POSTS_START';
export const GET_PRODUCTS_SUCCESS = ' GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

export const getProducts = () => (dispatch) => {
    dispatch({type: GET_PRODUCTS_START});
    axios
        // .get ('http://localhost:4000/products')
        .get ('https://store64-backend.herokuapp.com/products')
        .then((response)=> {
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data});
            console.log("API response", response.data);
        })
        .catch((error) => {
            dispatch({type: GET_PRODUCTS_FAILURE, payload: `${error.response.message} code: ${error.response.code}`});
            console.log(error);
        })
};

export const filterProducts = (input) => {
    return{type: FILTER_PRODUCTS, payload: input}
};