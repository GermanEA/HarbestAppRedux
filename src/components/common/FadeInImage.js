import React, { useContext, useState } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { useAnimation } from '../../hooks/animation/useAnimation';

export const FadeInImage = ({ style = {}, styleView = {} }) => {

    const { opacity, fadeIn } = useAnimation();
    const [ isLoading, setIsLoading ] = useState( true );

    const { theme:{ colors }, } = useContext( ThemeContext );

    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    return (
        <View style={{
            ...styleView,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            
            {
                isLoading && 
                    <ActivityIndicator 
                        style={{ position: 'absolute' }} 
                        color={ colors.primary }
                        size={ 30 }
                    />
            }

            <Animated.Image 
                source={ require('../../assets/img/no-image.png') }
                onLoadEnd={ finishLoading }
                style={{
                    ...style,
                    opacity
                }}
            />

        </View>
    )
}
