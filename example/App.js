/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';
import {AudioPlayer} from 'react-native-simple-audio-player';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#313131',
        justifyContent: 'center',
      }}>
      <AudioPlayer
        url={'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
      />
    </View>
  );
};

export default App;
