export const GET_CRYPTOS = 'GET_CRYPTOS';
export const GET_CRYPTOS_LOCAL = 'GET_CRYPTOS_LOCAL';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

// Models
import Crypto from '../../models/crypto';

import formatDate from '../../helpers/dateFormatter';

// Persistent storage
import {
    insertCrypto,
    fetchCryptos,
    fetchOneCrypto, 
    deleteCrypto,
    updateCrypto
} from '../../helpers/db';

// Action: GET_CRYPTOS
export const getCryptos = () => {

    return async (dispatch, getState) => {

        const favCryptos = getState().cryptos.cryptos.filter((crypto) => {
            return crypto.isFav
        });
        // Get crypto data
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');

            if (!response.ok) {
                throw new Error('Error fetching cryptos' + response.status)
            }

            if (response) {
                const resData = await response.json();

                // Build cryptos array
                const cryptos = [];
                for (var i = 0; i < resData.length; i++) {
                    // Check if in favorites
                    // From redux store
                    const check = favCryptos.find((crypto) => crypto.idCrypto === resData[i].id)
                    // And from persistent container: this allows user to add favorites even when offline and be sure their selection is retrieved when they get back online
                    const dbCryptoInfo = await fetchOneCrypto(resData[i].id);
                    let dbIsFav;
                    if (dbCryptoInfo.rows._array.length > 0) {
                        dbIsFav = dbCryptoInfo.rows._array[0].isFav; // 0 or 1
                    } else {
                        dbIsFav = 0;
                    }
                    
                    const isFav = check || dbIsFav === 1 ? true : false;
                    cryptos.push(new Crypto(
                        idCrypto = resData[i].id,
                        symbol = resData[i].symbol,
                        name = resData[i].name,
                        image = resData[i].image,
                        currentPrice = resData[i].current_price,
                        marketCapRank = resData[i].market_cap_rank,
                        high24h = resData[i].high_24h,
                        low24h = resData[i].low_24h,
                        priceChange24Perc = resData[i].price_change_percentage_24h,
                        isFav = isFav
                    ));
                    // Delete current entry in db and insert new data 
                    await deleteCrypto(resData[i].id);
                    const isFavBit = isFav ? 1 : 0
                    await insertCrypto(
                        resData[i].id,
                        resData[i].symbol,
                        resData[i].name,
                        resData[i].image,
                        resData[i].current_price,
                        resData[i].market_cap_rank,
                        resData[i].high_24h,
                        resData[i].low_24h,
                        resData[i].price_change_percentage_24h,
                        isFavBit,
                        formatDate(new Date())
                    );
                }                             
                // Dispatch action
                dispatch({
                    type: GET_CRYPTOS,
                    cryptos: cryptos
                });
                            
            }
        } catch (err) {
            throw new Error('Incorrect request url for address');
        }
    }
}

// Action: GET_CRYPTOS_LOCAL
export const getCryptosLocal = () => {

    return async dispatch => {
        // Get crypto data from local storage
        const dbResultFetch = await fetchCryptos();
        
        // Build cryptos array
        const cryptos = [];
        for (var i = 0; i < dbResultFetch.rows._array.length; i++) {
            if (dbResultFetch.rows._array.length === 200) {
                if (i % 2) {
                    cryptos.push(new Crypto(
                        idCrypto = dbResultFetch.rows._array[i].idCrypto,
                        symbol = dbResultFetch.rows._array[i].symbol,
                        name = dbResultFetch.rows._array[i].name,
                        image = dbResultFetch.rows._array[i].image,
                        currentPrice = dbResultFetch.rows._array[i].currentPrice,
                        marketCapRank = dbResultFetch.rows._array[i].marketCapRank,
                        high24h = dbResultFetch.rows._array[i].high24,
                        low24h = dbResultFetch.rows._array[i].low24,
                        priceChange24Perc = dbResultFetch.rows._array[i].priceChange24Perc,
                        isFav = dbResultFetch.rows._array[i].isFav === 0 ? false : true
                    ));
                }
            } else {
                cryptos.push(new Crypto(
                    idCrypto = dbResultFetch.rows._array[i].idCrypto,
                    symbol = dbResultFetch.rows._array[i].symbol,
                    name = dbResultFetch.rows._array[i].name,
                    image = dbResultFetch.rows._array[i].image,
                    currentPrice = dbResultFetch.rows._array[i].currentPrice,
                    marketCapRank = dbResultFetch.rows._array[i].marketCapRank,
                    high24h = dbResultFetch.rows._array[i].high24,
                    low24h = dbResultFetch.rows._array[i].low24,
                    priceChange24Perc = dbResultFetch.rows._array[i].priceChange24Perc,
                    isFav = dbResultFetch.rows._array[i].isFav === 0 ? false : true
                ));
            }
        }

        // Dispatch action
        dispatch({
            type: GET_CRYPTOS_LOCAL,
            cryptos: cryptos
        });
    }
}

// Action: ADD_TO_FAVORITES
export const addToFavorites = (cryptoItem) => {
    return async dispatch => {

        cryptoItem.isFav = true;

        await updateCrypto(1, cryptoItem.idCrypto);

        // Dispatch action
        dispatch({
            type: ADD_TO_FAVORITES,
            cryptoItem: cryptoItem
        });
    }
};

// Action: REMOVE_FROM_FAVORITES
export const removeFromFavorites = (cryptoItem) => {

    return async dispatch => {

        cryptoItem.isFav = false;

        await updateCrypto(0, cryptoItem.idCrypto);

        // Dispatch action
        dispatch({
            type: REMOVE_FROM_FAVORITES,
            cryptoItem: cryptoItem
        });

    }
};