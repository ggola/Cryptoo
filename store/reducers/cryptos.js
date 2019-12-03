import { GET_CRYPTOS, GET_CRYPTOS_LOCAL, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../actions/cryptos';

// Set initial state
const initialState = {
    cryptos: [],
    lastUpdated: new Date()
};

const cryptosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CRYPTOS: {
            return {
                cryptos: action.cryptos,
                lastUpdated: new Date()
            }
        };
        case GET_CRYPTOS_LOCAL: {
            return {
                ...state,
                cryptos: action.cryptos
            }
        };
        case ADD_TO_FAVORITES: {
            const cryptoItem = action.cryptoItem;
            const filteredCryptos = state.cryptos.filter((crypto) => {
                return crypto.idCrypto !== cryptoItem.idCrypto
            });
            return {
                ...state,
                cryptos: filteredCryptos.concat(cryptoItem)
            }
        };
        case REMOVE_FROM_FAVORITES: {
            const cryptoItem = action.cryptoItem;
            const filteredCryptos = state.cryptos.filter((crypto) => {
                return crypto.idCrypto !== cryptoItem.idCrypto
            });
            return {
                ...state,
                cryptos: filteredCryptos.concat(cryptoItem)
            }
        };
    default:
        return state;
    };
};

export default cryptosReducer;