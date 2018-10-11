/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RootScene from './src/RootScene';


/**
 *  这里拿到RCTRootView创建时传递的launchOptions
 * 
 */

AppRegistry.registerComponent(appName, () => RootScene);
