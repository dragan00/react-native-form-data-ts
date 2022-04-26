import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import Dashboard from '../screens/dashboard';

import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MediaFile } from '../components/FilesComponent';
import FilesModal from '../screens/files_modal';
import VideoPlayer from '../screens/files_modal/components/VideoPlayer';
import PDFViewer from '../screens/files_modal/components/PDF';

const Drawer = createDrawerNavigator<DrawerStackProps>();

export type DrawerStackProps = {
  Dashboard: undefined;
};
export const UserStack: React.FC = () => {
  return (
    <Drawer.Navigator
      backBehavior="history"
      initialRouteName="Dashboard"
      useLegacyImplementation={true}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackProps>();

export type RootStackProps = {
  UserStack: NavigatorScreenParams<DrawerStackProps>;
  FilesModal: { files: MediaFile[], index: number };
  VideoPlayer: { source: string };
  PDFViewer: { source: string };
  Login: undefined;
};


const AppNavigation: React.FC = () => (
  <RootStack.Navigator>
    <>
      <RootStack.Group screenOptions={{headerShown: false}}>
        <RootStack.Screen name="UserStack" component={UserStack} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal', headerShown: false, animation: 'fade_from_bottom' }}>
        <RootStack.Screen name="FilesModal" component={FilesModal} />
        <RootStack.Screen name="VideoPlayer" component={VideoPlayer} />
        <RootStack.Screen name="PDFViewer" component={PDFViewer} />
      </RootStack.Group>
    </>
  </RootStack.Navigator>
);

export default AppNavigation;
