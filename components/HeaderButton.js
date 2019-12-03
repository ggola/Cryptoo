import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/Colors';

// NOTE: must always forward all the props (key:value) pairs!
const CustomHeaderButton = props => {
    return (
        <HeaderButton 
            {...props}
            IconComponent={Icon}
            iconSize={23}
            color={Platform.OS === 'android' ? 'white' : COLORS.ACCENT}
        />
    );
};

export default CustomHeaderButton;