import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import OnboardingPage from './screens/OnboardingPage';
import SignupPage from './screens/SignupPage';
import LoginPage from './screens/LoginPage';
import uploadImg from './screens/uploadImg';
import imgResult from './screens/imgResult';

const screens = {
    // onboarding: {
    //     screen: OnboardingPage
    // },
    // login: {
    //     screen: LoginPage
    // },
    // signup: {
    //     screen: SignupPage
    // },
    Upload: {
        screen: uploadImg
    },
    Result: {
        screen: imgResult
    },
}

const stack = createStackNavigator(screens);
export default createAppContainer(stack);