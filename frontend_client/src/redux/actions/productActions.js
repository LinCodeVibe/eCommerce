import { setProducts, setLoading, setError, setPagination, setFavorites, setFavoritesToggle} from '../slices/product';
import axios from 'axios';

export const getProducts = (page, favoritesToggle) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.get(`/api/products/${page}/${10}`);
        const { products, pagination } = data;
        dispatch(setProducts(products));
        dispatch(setPagination(pagination));
     } catch (error) {
            dispatch(setError(
                error.reponse && error.reponse.data.message 
                ? error.response.data.message 
                : error.message 
                ? error.message
                : 'An expected error has ocurred. Please try again later.'

            ));
        }
    };

    export const addToFavorites = (id) => async (dispatch, getState) => {
        const {
            product: { favorites},
        } = getState();

        const newfavorites = [...favorites, id]
        localStorage.setItem('favorites', JSON.stringify(newfavorites));
        dispatch(setFavorites(newfavorites));
    };

    export const removeFromFavorites = (id) => async (dispatch, getState) => {
        const {
            product: { favorites},
        } = getState();

        const newfavorites = favorites.filter((favoriteId) => favoriteId !== id);
        localStorage.setItem('favorites', JSON.stringify(newfavorites));
        dispatch(setFavorites(newfavorites));
    };

    export const toggleFavorites = (toggle) => async (dispatch, getState) => {
        const {
            product: { favorites, products},
        } = getState();

        if(toggle) {
            const filterProducts = products.filter((product) => favorites.includes(product._id));
            dispatch(setFavoritesToggle(toggle));
            dispatch(setProducts(filterProducts));
        } else {
            dispatch(setFavoritesToggle(false));
            dispatch(getProducts(1));
        }
    };