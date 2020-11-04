import * as React from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { View } from "../components/Themed";
import dayjs from "dayjs";

const { width } = Dimensions.get("screen");
const SIZE = width * 0.9;
const TICK_INTERVAL = 1000;

export default class TabTwoScreen extends React.Component {
  state = {
    index: new Animated.Value(0),
    tick: new Animated.Value(0),
    scales: [...Array(6).keys()].map(() => new Animated.Value(0)),
  };

  _timer = 0;
  _ticker = null;

  componentDidMount() {
    const current = dayjs();
    const diff = current.endOf("day").diff(current, "seconds");
    const oneDay = 24 * 60 * 60;

    this._timer = oneDay - diff;
    this.state.tick.setValue(this._timer);
    this.state.index.setValue(this._timer - 30); // to avoid initial jump

    this._animate();
    this._ticker = setInterval(() => {
      this._timer += 1;
      this.state.tick.setValue(this._timer);
    }, TICK_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this._ticker);
    this._ticker = null;
  }
  _animate = () => {
    const scaleStaggerAnimations = this.state.scales.map((animated) => {
      return Animated.spring(animated, {
        // give an elastic quality to the animations
        toValue: 1,
        tension: 18,
        friction: 3,
        useNativeDriver: true,
      });
    });

    Animated.parallel([
      Animated.stagger(
        TICK_INTERVAL / this.state.scales.length,
        scaleStaggerAnimations
      ),
      Animated.timing(this.state.index, {
        toValue: this.state.tick,
        duration: TICK_INTERVAL / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    const {
      index,
      scales: [small, med, big, secondsScale, minutesScale, hoursScale],
    } = this.state;

    const interpolated = {
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
    };

    const secondDegrees = Animated.multiply(index, 360 / 60);
    const transformSeconds = {
      transform: [
        { rotate: secondDegrees.interpolate(interpolated) },
        { scale: secondsScale },
      ],
    };

    const rotateMinutes = Animated.divide(
      secondDegrees,
      new Animated.Value(60)
    );
    const transformMinutes = {
      transform: [
        { rotate: rotateMinutes.interpolate(interpolated) },
        { scale: minutesScale },
      ],
    };

    const rotateHours = Animated.divide(rotateMinutes, new Animated.Value(12));
    const transformHours = {
      transform: [
        { rotate: rotateHours.interpolate(interpolated) },
        { scale: hoursScale },
      ],
    };

    return (
      <View style={styles.outterContainer}>

          <StatusBar hidden={true} />
          <Animated.View
            style={[styles.big, { transform: [{ scale: big }] }]}
          />
          <Animated.View
            style={[styles.medium, { transform: [{ scale: med }] }]}
          />

          <Animated.View style={[styles.mover, transformHours]}>
            <View style={[styles.hours]} />
          </Animated.View>
          <Animated.View style={[styles.mover, transformMinutes]}>
            <View style={[styles.minutes]} />
          </Animated.View>
          <Animated.View style={[styles.mover, transformSeconds]}>
            <View style={[styles.seconds]} />
          </Animated.View>
          <Animated.View
            style={[styles.small, { transform: [{ scale: small }] }]}
          />

        <View style={styles.filler}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mover: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  hours: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "35%",
    marginTop: "15%",
    width: 4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: "45%",
    marginTop: "5%",
    width: 3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: "rgba(234, 128, 252, 1)",
    height: "50%",
    width: 2,
    borderRadius: 2,
  },
  big: {
    position: "absolute",
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },
  medium: {
    position: "absolute",
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: "rgba(200, 200, 200, 0.4)",
  },
  small: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(234, 128, 252, 1)",
  },
  outterContainer: {
    flex: 1,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
  },

  filler: {
    height: 300
  }
});
