import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = () => {
    
    const opacity  = useRef( new Animated.Value(0) ).current;
    const opacityBtn  = useRef( new Animated.Value(1) ).current;
    const top = useRef( new Animated.Value(-140) ).current;
    const scale = useRef( new Animated.Value(1) ).current;

    const fadeIn = ( duration = 300 ) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration,
                useNativeDriver: true
            }
        ).start();
    }

    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    const onPressBtn = () => {
        Animated.sequence([
            Animated.timing(
                opacityBtn,
                {
                    toValue: 0.5,
                    duration: 150,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                opacityBtn,
                {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true
                }
            )
        ]).start();
    }

    const startMovingPosition = ( initPosition, finalPosition, duration = 300 ) => {

        top.setValue(initPosition);

         Animated.timing(
            top,
            {
                toValue: finalPosition,
                duration: duration,
                useNativeDriver: true,
                // easing: Easing.bounce
            }
        ).start();
    }

    const pulse = ( maxValue, minValue ) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, 
                {
                    toValue: maxValue,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: minValue,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: maxValue,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: minValue,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }


    return {
        opacity,
        opacityBtn,
        top,
        scale,
        fadeIn,
        fadeOut,
        onPressBtn,
        startMovingPosition,
        pulse
    }
}
