import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';

interface Props {
  playing: boolean;
  showPreviousAndNext: boolean;
  showSkip: boolean;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onPlay: () => void;
  onPause: () => void;
  skipForwards?: () => void;
  skipBackwards?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const PlayerControls: React.FC<Props> = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
}) => (
  <View style={styles.wrapper}>
    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
        onPress={onPrevious}
        disabled={previousDisabled}>
        <Image style={styles.icon} source={require('../../../../../assets/icons/video-previous.png')} />
      </TouchableOpacity>
    )}

    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <Image style={styles.icon} source={require('../../../../../assets/icons/video-backward.png')} />
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={styles.touchable}
      onPress={playing ? onPause : onPlay}>
      {
        playing ? 
        <Image style={{ width: 48, height: 48 }} source={require('../../../../../assets/icons/video-pause.png')} /> : 
        <Image style={{ width: 48, height: 48 }} source={require('../../../../../assets/icons/video-play.png')} />
    }
    </TouchableOpacity>

    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <Image style={styles.icon} source={require('../../../../../assets/icons/video-forward.png')} />
      </TouchableOpacity>
    )}

    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
        onPress={onNext}
        disabled={nextDisabled}>
        <Image style={styles.icon} source={require('../../../../../assets/icons/video-next.png')} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
    zIndex: 99999999
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
  icon: {
      width: 24,
      height: 24
  }
});

export default PlayerControls;