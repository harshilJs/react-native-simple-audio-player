import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  rowContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    alignSelf: "center",
    position: "relative",
  },
  playBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    width: "100%",
  },
  slider: {
    height: 30,
    width: "100%",
    marginBottom: 3,
  },
  durationContainer: { flexDirection: "row", justifyContent: "space-between" },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
  crossLine: {
    position: "absolute",
    transform: [ {rotate: "-60deg"} ],
    top: 15,
    left: -1,
    width: 30,
    height: 1,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  volumeControlContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#00000099",
    paddingHorizontal: 16,
    borderRadius: 50,
    ...Platform.select({
      ios: {
        height: 44
      },
      android: {
        height: 40
      },
    }),
  },
  volumeSlider: {
    width: '50%',
  },
  timeText: {
    color: '#fff',
    fontSize: 18,
  },
  playIcon: { height: 30, width: 30, resizeMode: 'contain' },
});
