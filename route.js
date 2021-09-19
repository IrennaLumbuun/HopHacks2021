import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import OnboardingPage from './screens/OnboardingPage';
import SignupPage from './screens/SignupPage';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';

const screens = {
    onboarding: {
        screen: OnboardingPage
    },
    login: {
        screen: LoginPage
    },
    signup: {
        screen: SignupPage
    },
    home: {
        screen: HomePage
    }
}

const stack = createStackNavigator(screens);
export default createAppContainer(stack);