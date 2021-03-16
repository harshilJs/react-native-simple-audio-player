import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, LayoutAnimation, UIManager, Image } from "react-native";
import { styles } from "./styles";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import { toHHMMSS } from "./utils";
import { Images } from "./assets/index";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const volumeControlTime = 3000;
 
export const AudioPlayer = (props) => {
  const { url, style, repeatOnComponent, repeatOffComponent } = props;
  const [paused, setPaused] = useState(true);

  const videoRef = useRef(null);
  const controlTimer = useRef(0);

  const [totalLength, setTotalLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [volumeControl, setVolumeControl] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const onSeek = (time) => {
    time = Math.round(time);
    videoRef && videoRef.current.seek(time);
    setCurrentPosition(time);
    setPaused(false);
  };

  const fixDuration = (data) => {
    setLoading(false);
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = (data) => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const togglePlay = () => {
    setPaused(!paused);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const toggleVolumeControl = () => {
    setVolumeTimer(!volumeControl);
    LayoutAnimation.easeInEaseOut();
    setVolumeControl(!volumeControl);
  };

  const setVolumeTimer = (setTimer = true) => {
    clearTimeout(controlTimer.current);
    controlTimer.current = 0;
    if (setTimer) {
      controlTimer.current = setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setVolumeControl(false);
      }, volumeControlTime);
    }
  };

  const onVolumeChange = (vol) => {
    setVolumeTimer();
    setVolume(vol);
  };

  const resetAudio = () => {
    if (!repeat) {
      setPaused(true);
    }
    setCurrentPosition(0);
  };

  return (
    <View style={[style && style, {}]}>
      <Video
        source={{ uri: url }}
        ref={videoRef}
        playInBackground={false}
        audioOnly={true}
        playWhenInactive={false}
        paused={paused}
        onEnd={resetAudio}
        onLoad={fixDuration}
        onLoadStart={() => setLoading(true)}
        onProgress={setTime}
        volume={volume}
        repeat={repeat}
        style={{ height: 0, width: 0 }}
      />

      <View>
        <View style={styles.rowContainer}>
          {loading && (
            <View style={{ margin: 18 }}>
              <ActivityIndicator size="large" color="#FFF"/>
            </View>
          ) || (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                style={styles.iconContainer}
                onPress={toggleRepeat}
              >
                <Image source={Images.repeatIcon} style={styles.playIcon}/>
                {!repeat && <View style={styles.crossLine}/>}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconContainer, styles.playBtn]} onPress={togglePlay}>
                <Image
                  source={paused ? Images.playIcon : Images.pauseIcon}
                  style={styles.playIcon}
                />
              </TouchableOpacity>
              <View
                style={[
                  styles.volumeControlContainer,
                  volumeControl ? { paddingHorizontal: 12 } : { backgroundColor: "transparent" }
                ]}
              >
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  style={styles.iconContainer}
                  onPress={toggleVolumeControl}
                >
                  <Image
                    source={volume === 0 ? Images.muteIcon : Images.soundIcon}
                    style={styles.playIcon}
                  />
                </TouchableOpacity>
                {volumeControl && (
                  <Slider
                    style={styles.volumeSlider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={'#fff'}
                    maximumTrackTintColor={'grey'}
                    thumbTintColor={'#fff'}
                    onSlidingComplete={onVolumeChange}
                    value={volume}
                  />
                )}
              </View>
            </View>
          )}

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={Math.max(totalLength, 1, currentPosition + 1)}
              minimumTrackTintColor={'#fff'}
              maximumTrackTintColor={'grey'}
              onSlidingComplete={onSeek}
              value={currentPosition}
            />
            <View style={styles.durationContainer}>
              <Text style={styles.timeText}>
                {toHHMMSS(currentPosition)}
              </Text>
              <Text style={styles.timeText}>
                {toHHMMSS(totalLength)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
