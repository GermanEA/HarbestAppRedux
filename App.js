import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import { Navigator } from './src/navigator/navigator';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from './src/context/theme/ThemeContext';

const AppState = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        { children }
      </ThemeProvider>
    </Provider>
  )
}

const App = () => {
  return (
    <AppState>
      <Navigator />
      <Toast />
    </AppState>
  );
};

export default App;