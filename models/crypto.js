class Crypto {
    constructor(idCrypto, symbol, name, image, currentPrice, marketCapRank, high24h, low24h, priceChange24Perc, isFav) {
        this.idCrypto = idCrypto;
        this.symbol = symbol;
        this.name = name;
        this.image = image;
        this.currentPrice = currentPrice;
        this.marketCapRank = marketCapRank;
        this.high24h = high24h;
        this.low24h = low24h;
        this.priceChange24Perc = priceChange24Perc;
        this.isFav = isFav;
    }
}

export default Crypto;