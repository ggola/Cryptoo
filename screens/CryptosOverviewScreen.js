import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
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

// Connectivity check
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

// Constants
import COLORS from '../constants/Colors';

import formatDate from '../helpers/dateFormatter';

const CryptosOverviewScreen = props => {

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lastUpdated = useSelector((state) => state.cryptos.lastUpdated);  
  // Retrieve cryptos
  const cryptos = useSelector((state) => state.cryptos.cryptos.sort((a, b) => {
    if (a.marketCapRank > b.marketCapRank) {
      return 1;
    }
    return -1;
  })); 

  // Check connectivity
  useEffect(() => {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        console.log('android internet reachable?' + state.isInternetReachable);
        loadData(state.isInternetReachable).then(() => {
          setIsLoading(false);
        });
      });
    } else {
      const unsubscribe = NetInfo.addEventListener(state => {
        console.log('ios internet reachable?' + state.isInternetReachable);
        loadData(state.isInternetReachable).then(() => {
          setIsLoading(false);
        });
      });
      return () => {
        unsubscribe();
      }
    }
  }, [])

  const loadData = useCallback(async (isConnected) => {
    setError(null);
    try {
      if (isConnected) {
        await dispatch(cryptosActions.getCryptos());
      } else {
        await dispatch(cryptosActions.getCryptosLocal());
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Refresh
  const refreshHandler = () => {
      setIsRefreshing(true);
      loadData(netInfo.isInternetReachable).then(() => {
        setIsRefreshing(false);
      });
  };

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
      {isLoading ? 
        <View style={styles.container}>
          <ActivityIndicator size='large' color={COLORS.PRIMARY}/>
        </View>
      :
        (error ? 
          <View style={styles.container}>
              <Text style={styles.warning}>There was a problem fetching the data</Text>
          </View>                
        :
          (cryptos.length > 0 ?
            <View>
              <View style={styles.lastUpdatedContainer}>
                <Text style={styles.lastUpdatedText}>Last updated on {formatDate(new Date(lastUpdated))}</Text>
                <Text style={{...styles.infoText, color: netInfo.isInternetReachable ? COLORS.ACCENT : 'red'}}>{netInfo.isInternetReachable ? 'PULL TO REFRESH' : 'NO CONNECTION - SHOWING LATEST AVAILABLE DATA'}</Text>
              </View>
              <SwipeListView
                onRefresh={refreshHandler}
                refreshing={isRefreshing} 
                keyExtractor={(item) => item.idCrypto}
                data={cryptos}
                initialNumToRender={10}
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
            </View>
          :
            <View style={styles.container}>
              <Text style={styles.warning}>Ops...No cryptos to show here</Text>
            </View>
          )
        )
      }
    </SafeAreaView>
  );
}

// Add navigation options
CryptosOverviewScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'All Cryptos',
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
  },
  lastUpdatedContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lastUpdatedText: {
    fontSize: 13,
    fontWeight: '300',
    color: COLORS.TEXT,
    marginBottom: 6
  },
  infoText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.ACCENT
  }
});

export default CryptosOverviewScreen;
