import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackProps } from '../../../../navigation';

type IProps = NativeStackScreenProps<RootStackProps, "VideoPlayer">

interface State {
  fullscreen: boolean;
  play: boolean;
  currentTime: number;
  duration: number;
  showControls: boolean;
}

const VideoPlayer: React.FC<IProps> = ({ route }) => {
  const videoRef: any = React.createRef<Video>();
  const [state, setState] = useState<State>({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    Orientation.unlockAllOrientations()
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View style={state.fullscreen ? styles.fullscreenContainer: styles.container}>
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            source={{ uri: route.params.source }}
            style={state.fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play}
          />
          {state.showControls && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={styles.fullscreenButton}>
                {/* {
                    state.fullscreen ?
                        <Image style={styles.icon} source={require('../../../../../assets/icons/fullscreen-close.png')} /> :
                        <Image style={styles.icon} source={require('../../../../../assets/icons/fullscreen-open.png')} />
                } */}
              </TouchableOpacity>
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={state.play}
                showPreviousAndNext={false}
                showSkip={true}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />
              <ProgressBar
                currentTime={state.currentTime}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState(s => ({...s, fullscreen: true})))
      : (setState(s => ({...s, fullscreen: false})));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }

    setState({...state, play: true});
    setTimeout(() => setState(s => ({...s, showControls: false})), 4000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 10);
    setState({...state, currentTime: state.currentTime - 10});
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 10);
    setState({...state, currentTime: state.currentTime + 10});
  }

  function onSeek(data: OnSeekData) {
    videoRef.current.seek(data.currentTime + 1, data.seekTime);
    setState({...state, currentTime: data.seekTime});
  }

  function onLoadEnd(data: OnLoadData) {
    setState(s => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
  }

  function onProgress(data: OnProgressData) {
    setState(s => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function onEnd() {
    setState({...state, play: false});
    videoRef.current.seek(0);
  }

  function showControls() {
    state.showControls
      ? setState({...state, showControls: false})
      : setState({...state, showControls: true});
  }
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    zIndex: 9999999
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
    zIndex: 99999
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  icon: {
    width: 24,
    height: 24
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
    zIndex: 9999999
  },
});

export default VideoPlayer;