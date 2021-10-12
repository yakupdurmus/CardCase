import * as React from 'react';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers'

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import DetailScreen from './screens/DetailScreen';
import ListScreen from './screens/ListScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="List" component={ListScreen} />
                    <Stack.Screen name="Detail" component={DetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default Navigation