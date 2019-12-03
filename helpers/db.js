import * as SQLite from 'expo-sqlite';

// Open database
const db = SQLite.openDatabase('cryptos.db');

// Initialize the database and create the table
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                // 1. Define table if not exists
                'CREATE TABLE IF NOT EXISTS cryptos (id INTEGER PRIMARY KEY NOT NULL, idCrypto TEXT NOT NULL, symbol TEXT NOT NULL, name TEXT NOT NULL, image TEXT NOT NULL, currentPrice REAL NOT NULL, marketCapRank INTEGER NOT NULL, high24 REAL NOT NULL, low24 REAL NOT NULL, priceChange24Perc REAL NOT NULL, isFav BIT, lastUpdated TEXT NOT NULL);',
                // options
                [],
                // success callback
                () => {
                    resolve();
                },
                // fail callback
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertCrypto = (idCrypto, symbol, name, image, currentPrice, marketCapRank, high24, low24, priceChange24Perc, isFav, lastUpdated) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO cryptos (idCrypto, symbol, name, image, currentPrice, marketCapRank, high24, low24, priceChange24Perc, isFav, lastUpdated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                // Options: values to insert
                [idCrypto, symbol, name, image, currentPrice, marketCapRank, high24, low24, priceChange24Perc, isFav, lastUpdated],
                // Success callback
                (_, result) => {
                    resolve(result);
                },
                // Fail callback
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchCryptos = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM cryptos',
                [],
                // Success callback
                (_, result) => {
                    resolve(result);
                },
                // Fail callback
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchOneCrypto = (idCrypto) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT isFav FROM cryptos WHERE idCrypto=?',
                [idCrypto],
                // Success callback
                (_, result) => {
                    resolve(result);
                },
                // Fail callback
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const deleteCrypto = (idCrypto) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM cryptos WHERE idCrypto=?',
                [idCrypto],
                // Success callback
                (_, result) => {
                    resolve(result);
                },
                // Fail callback
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const updateCrypto = (isFavValue, idCrypto) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE cryptos SET isFav = ? WHERE idCrypto = ?',
                [isFavValue, idCrypto],
                // Success callback
                (_, result) => {
                    resolve(result);
                },
                // Fail callback
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};



