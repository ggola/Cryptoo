import React from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
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

const TopGainersScreen = props => {

  const dispatch = useDispatch();

  // Retrieve cryptos
  const cryptos = useSelector((state) => state.cryptos.cryptos.sort((a, b) => {
    if (a.priceChange24Perc < b.priceChange24Perc) {
      return 1;
    }
    return -1;
  }));
  let cryptosFiltered = [];
  if (cryptos) {
    cryptosFiltered = cryptos.filter((crypto) => {
      return crypto.priceChange24Perc > 0
    })
  }

  // Add to favorite handler
  const addToFavoriteHandler = (cryptoItem) => {
    if (cryptoItem.isFav) {
      Alert.alert(`${cryptoItem.name} is already in your favorites`, 'Go to your favorites tab to remove it', [{
        text: 'Got it',
        style: 'default'
      }]);
    } else {
      dispatch(cryptosActions.addToFavorites(cryptoItem));
    }
  } 

  return (
    <SafeAreaView style={styles.container}>
      {cryptosFiltered.length > 0 ?
        <SwipeListView
          keyExtractor={(item) => item.idCrypto}
          data={cryptosFiltered}
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
                onPress={addToFavoriteHandler.bind(this, itemData.item)}>
                  <View style={styles.iconContainer}>
                    <Icon 
                        name={itemData.item.isFav ? (Platform.OS === 'android' ? 'md-star' : 'ios-star') : (Platform.OS === 'android' ? 'md-star-outline' : 'ios-star-outline')}
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
          <Text style={styles.warning}>Ops...No cryptos to show here</Text>
        </View>
      }
    </SafeAreaView>
  );
}

// Add navigation options
TopGainersScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: '24h Gainers',
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

export default TopGainersScreen;