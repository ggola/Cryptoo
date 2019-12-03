import React from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

// Header Buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import HeaderButton from '../components/HeaderButton';
import CryptoListItem from '../components/CryptoListItem';

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import * as cryptosActions from '../store/actions/cryptos';

// Constants
import COLORS from '../constants/Colors';

const FavoriteCryptosScreen = props => {

  const dispatch = useDispatch();

  // Retrieve cryptos
  const cryptos = useSelector((state) => state.cryptos.cryptos.filter((crypto) => {
    return crypto.isFav
  }));

  // Remove from favorite handler
  const removeFromFavoriteHandler = (cryptoItem) => {
    dispatch(cryptosActions.removeFromFavorites(cryptoItem));
  } 

  return (
    <SafeAreaView style={styles.container}>
      {cryptos.length > 0 ?
        <SwipeListView
          keyExtractor={(item) => item.idCrypto}
          data={cryptos}
          renderItem={(itemData) =>
            <CryptoListItem 
              crypto={itemData.item}
              navigation={props.navigation}
            />
          }
          renderHiddenItem={ (itemData) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                activeOpacity={0.5}
                useForeground
                onPress={removeFromFavoriteHandler.bind(this, itemData.item)}>
                  <View style={styles.iconContainer}>
                    <Icon 
                      name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
                      size={25}
                      color={COLORS.ACCENT}/>
                  </View>
              </TouchableOpacity>
            </View>

          )}
          rightOpenValue={-75}
          disableRightSwipe={true}
        />
      :
        <View style={styles.container}>
          <Text style={styles.warning}>You have no favorite cryptos...Add some!</Text>
        </View>
      }
    </SafeAreaView>
  );
}

// Add navigation options
FavoriteCryptosScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Favorites',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginTop: 15
  },
  iconContainer: {
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoriteCryptosScreen;