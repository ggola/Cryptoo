import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import COLORS from '../constants/Colors';

class CryptoListItem extends PureComponent {  
    
    render() {
        return (
            <View style={styles.externalContainer}>
                <View style={styles.container}>
                    <View style={styles.symbolContainer}>
                        <Image 
                            style={styles.image}
                            source = {{ uri: this.props.crypto.image }}
                        />
                        <Text style={styles.symbol}>{this.props.crypto.symbol.toUpperCase()}</Text>
                        <Text style={styles.name}>| {this.props.crypto.name.toUpperCase()}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${this.props.crypto.currentPrice}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.priceDetailsContainer}>
                        <Text style={styles.priceDetailsHeader}>LOW: </Text>
                        <Text style={styles.priceDetails}>{this.props.crypto.low24h}  </Text>
                        <Text style={styles.priceDetailsHeader}>HIGH: </Text>
                        <Text style={styles.priceDetails}>{this.props.crypto.high24h}</Text>
                    </View>
                    <View style={styles.pricePercContainer}>
                        <Text style={styles.priceDetailsHeader}>24h: </Text>
                        <Text style={{ ...styles.pricePerc, color: this.props.crypto.priceChange24Perc > 0 ? 'green' : 'red'}}>{this.props.crypto.priceChange24Perc.toFixed(2)}%</Text>
                    </View>
                </View>
            </View>
        
        );
    }

};

const styles = StyleSheet.create({
    externalContainer: {
        borderColor: COLORS.PRIMARY,
        borderBottomWidth: 0.5,
        marginTop: 15,
        marginHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 13,
        backgroundColor: 'white'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    symbolContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    symbol: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.TEXT,
        marginRight: 8
    },
    name: {
        fontSize: 12,
        fontWeight: '200',
        color: COLORS.TEXT,
        marginRight: 8
    },
    priceContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    price: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.TEXT
    },
    image: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    priceDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 12,
        marginLeft: 30
    },
    priceDetailsHeader: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.TEXT
    },
    priceDetails: {
        fontSize: 11,
        fontWeight: '400',
        color: COLORS.TEXT
    },
    pricePercContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12
    },
    pricePerc: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.TEXT
    }
});

export default CryptoListItem;