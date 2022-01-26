import axios from "axios";

export const GET_PRODUCTS_START = 'GET_POSTS_START';
export const GET_PRODUCTS_SUCCESS = ' GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const getProducts = () => (dispatch) => {
    console.log("getting Products");
    dispatch({type: GET_PRODUCTS_START});
    axios
        .get ('https://fakestoreapi.com/products')
        .then((response)=> {
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data});
            console.log("API response", response.data);
        })
        .catch((error) => {
            dispatch({type: GET_PRODUCTS_FAILURE, payload: `${error.response.message} code: ${error.response.code}`});
            console.log(error);
        })
};