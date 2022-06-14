import React, { useRef } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";
import locations from "./model/locations";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSun,
  faCloudRain,
  faCloud,
  faMoon,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons/";
// import { TouchableOpacity } from "react-native-web";

const WeatherIcon = (weatherType) => {
  if (weatherType === "Sunny") {
    bg = faSun;
  }
  if (weatherType === "Rainy") {
    bg = faCloudRain;
  }
  if (weatherType === "Cloudy") {
    bg = faCloud;
  }
  if (weatherType === "Night") {
    bg = faMoon;
  }
  return <FontAwesomeIcon icon={bg} style={styles.icon} size={34} />;
};

export default function App() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        {locations.map((location, index) => {
          if (location.weatherType === "Sunny") {
            bgImg = require("./assets/sunny.jpg");
          } else if (location.weatherType === "Night") {
            bgImg = require("./assets/night2.jpg");
          } else if (location.weatherType === "Cloudy") {
            bgImg = require("./assets/cloudy.jpeg");
          } else if (location.weatherType === "Rainy") {
            bgImg = require("./assets/rainy.jpg");
          }
          return (
            <View
              key={index}
              style={{ width: windowWidth, height: windowHeight }}
            >
              <ImageBackground
                source={bgImg}
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    padding: 20,
                  }}
                >
                  <View style={styles.topInfoWrapper}>
                    <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.time}>{location.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temparature}>
                        {location.temparature}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {WeatherIcon(location.weatherType)}
                        <Text style={styles.weatherType}>
                          {location.weatherType}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "rgba(255,255,255,0.7)",
                      borderBottomWidth: 1,
                      marginTop: 20,
                    }}
                  />
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.infoText}>wind</Text>
                      <Text style={[styles.infoText, { fontSize: 24 }]}>
                        {location.wind}
                      </Text>
                      <Text style={styles.infoText}>km/h</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.wind / 2,
                            height: 5,
                            backgroundColor: "#69F0AE",
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.infoText}>Rain</Text>
                      <Text style={[styles.infoText, { fontSize: 24 }]}>
                        {location.rain}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.rain / 2,
                            height: 5,
                            backgroundColor: "red",
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.infoText}>Humidity</Text>
                      <Text style={[styles.infoText, { fontSize: 24 }]}>
                        {location.humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.humidity / 2,
                            height: 5,
                            backgroundColor: "#69F0AE",
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.appHeader}>
        <TouchableOpacity>
          <FontAwesomeIcon size={24} icon={faMagnifyingGlass} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon size={24} icon={faBars} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          top: 140,
          left: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {locations.map((location, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: "clamp",
          });
          return (
            <Animated.View key={index} style={[styles.normalDot, { width }]} />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "white",
  },
  city: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  time: {
    color: "white",
    fontWeight: "bold",
  },
  temparature: {
    color: "white",
    fontSize: 85,
  },
  weatherType: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: 35,
    marginLeft: 10,
  },

  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: "space-between",
  },
  bottomInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 34,
    height: 34,
    color: "white",
  },

  infoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    // fontFamily:""
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  appHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: getStatusBarHeight() + 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
});
