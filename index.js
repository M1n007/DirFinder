/** @format */

import {AppRegistry} from 'react-native';
import DirFinder from './src/index'
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => DirFinder);
