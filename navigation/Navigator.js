import React from 'react';
import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';

// Constants
import COLORS from '../constants/Colors';

// Screens
import CryptosOverviewScreen from '../screens/CryptosOverviewScreen';
import FavoriteCryptosScreen from '../screens/FavoriteCryptosScreen';
import TopGainersScreen from '../screens/TopGainersScreen';

// Default Navigation Options
const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.PRIMARY : '',
    },
    headerTitleStyle: {
        fontSize: 17
    },
    headerBackTitleStyle: {
        fontSize: 17
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.PRIMARY
};

// All cryptos stack navigator
const AllCryptosStackNavigator = createStackNavigator({
    CryptosOverview: CryptosOverviewScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

// Favorite cryptos stack navigator
const FavCryptosStackNavigator = createStackNavigator({
    FavCryptos: FavoriteCryptosScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

// Top gainers stack navigator
const TopGainersStackNavigator = createStackNavigator({
    TopGainers: TopGainersScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

// Drawer Navigator
const DrawerNavigator = createDrawerNavigator({
    Cryptos: {
        screen: AllCryptosStackNavigator,
        navigationOptions: {
            drawerLabel: 'All Cryptos',
            drawerIcon: drawerConfig => <Icon
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}/>
        }
    },
    Favorites: {
        screen: FavCryptosStackNavigator,
        navigationOptions: {
            drawerLabel: 'Favorites',
            drawerIcon: drawerConfig => <Icon
                name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
                size={23}
                color={drawerConfig.tintColor}/>
        }
    },
    TopGainers: {
        screen: TopGainersStackNavigator,
        navigationOptions: {
            drawerLabel: '24h Gainers',
            drawerIcon: drawerConfig => <Icon
                name={Platform.OS === 'android' ? 'md-trophy' : 'ios-trophy'}
                size={23}
                color={drawerConfig.tintColor}/>
        }
    }
}, {
    contentOptions: {
        activeTintColor: COLORS.ACCENT,
        labelStyle: {
            fontSize: 16
        }
    }
});

export default createAppContainer(DrawerNavigator);