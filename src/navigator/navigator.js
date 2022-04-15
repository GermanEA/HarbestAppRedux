import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import { ProductDetailsScreen } from '../screens/product/ProductDetailsScreen';



const Stack = createNativeStackNavigator();

export const Navigator = () => {

    const optionsNavigator = {
        headerShown: false
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={ optionsNavigator }       
            >
                {           
                    <>
                        <Stack.Screen name="HomeScreen" component={ HomeScreen } />                 
                        <Stack.Screen name="ProductDetailsScreen" component={ ProductDetailsScreen } />       
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}