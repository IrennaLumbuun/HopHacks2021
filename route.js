import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import screen1 from './screens/screen1';
import screen2 from './screens/screen2';

const screens = {
    one: {
        screen: screen1
    },
    two: {
        screen: screen2
    }
}

const stack = createStackNavigator(screens);
export default createAppContainer(stack);