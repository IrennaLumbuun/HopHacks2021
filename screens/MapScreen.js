import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Icon,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
//import Geolocation from '@react-native-community/geolocation';
//import { request, PERMISSIONS } from 'react-native-permissions';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as Font from "expo-font";
import { useFonts, Anton_400Regular } from "@expo-google-fonts/anton";
import Constants from "expo-constants";

export class MapScreen extends React.Component {
  // locateCurrentPosition = () => {
  //     Geolocation.getCurrentPosition(
  //         position => {
  //             console.log(JSON.stringify(position));
  //         }
  //     )
  // }

  // requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //         var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

  //         if (response === 'granted') {
  //             this.locateCurrentPosition();
  //         }
  //     } else {
  //         var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  //         if (response === 'granted') {
  //             this.locateCurrentPosition();
  //         }
  //     }
  // }

  state = {
    hasLocationPermission: false,
    latitude: 37.78825,
    longitude: -122.4324,
    foodBankList: [],
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  };

  phoneNumberList = [];

  componentDidMount() {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync();


    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        hasLocationPermissions: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
      });
    } else {
      alert("Location Permission not Granted!");
    }
  }

  handleFoodBankSearch = () => {
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const location = `${this.state.latitude},${this.state.longitude}`;
    const radius = "8000"; // in meters
    const keyword = encodeURI("food bank");
    const key = "AIzaSyA55xIIs4SXFxfEHDvgz706yBaUje0n24c";
    const queryString =
      url +
      "location=" +
      location +
      "&radius=" +
      radius +
      "&keyword=" +
      keyword +
      "&key=" +
      key;

    fetch(queryString)
      .then((response) => response.json())
      .then((result) => this.setState({ foodBankList: result }));
  };

  // Another Query to get the phone number
  handleNotification = (place_id) => {
    const url = "https://maps.googleapis.com/maps/api/place/details/json?";
    const fields = "formatted_phone_number";
    const key = "AIzaSyA55xIIs4SXFxfEHDvgz706yBaUje0n24c";
    const queryString =
      url + "fields=" + fields + "&place_id=" + place_id + "&key=" + key;

    console.log(queryString);
    fetch(queryString).then((response) => response.json()).then((result) => this.phoneNumberList = result);

    // const client = require("twilio")(
    //   "AC521cfb478637b417dc3b9abd4c91e92c",
    //   "d60fb113ac3ee4f38bf206063608197f"
    // );

    // client.messages
    //   .create({
    //     to: this.phoneNumberList,
    //     messagingServiceSid: "MG997794235237e0684d12b7f8085b011b",
    //     body: "Food is available for pickup!",
    //   })

  };

  render() {
    console.log(this.state.foodBankList);
    const renderItem = ({ item }) => {
      const { icon, name, place_id } = item;

      return (
        <TouchableOpacity
          style={this.styles.itemContainer}
          onPress={() => this.handleNotification(place_id)}
        >
          <View style={this.styles.item}>
            {icon ? (
              <Image
                style={{ width: 45, height: 45, borderRadius: 100 }}
                source={{ uri: icon }}
              />
            ) : (
              <View
                style={{ width: 45, height: 45, backgroundColor: "grey" }}
              ></View>
            )}
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text>{name}</Text>
              </View>
              <Text style={{ color: "red" }}>
                Tap to Send Notification of Available Leftovers!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <SafeAreaView style={this.styles.background}>
        <View style={this.styles.titleBox}>
          <Text style={this.styles.title}>Waste Fighters</Text>
        </View>
        <MapView
          style={this.styles.map}
          showUserLocation={true}
          provider={PROVIDER_GOOGLE}
          showUserLocation={true}
          region={this.state.region}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title={"Your Location"}
          >
            <Callout>
              <Text>Your location</Text>
            </Callout>
          </Marker>
        </MapView>
        <View style={this.styles.search}>
          <TouchableOpacity onPress={() => this.handleFoodBankSearch()}>
            <Text style={this.styles.text}>Search Nearby Food Banks</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.foodBankList.results}
          keyExtractor={(item) => item.place_id}
          //   renderItem={({ item }) => (
          //     //   <Text style={{ color: "gold", fontSize: 32 }}>{item.name}</Text>
          //     <TouchableOpacity></TouchableOpacity>
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "grey" }}></View>
          )}
          //)}
          style={this.styles.list}
        ></FlatList>
      </SafeAreaView>
    );
  }
  styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: "#823df2",
    },
    titleBox: {
      width: "100%",
      //height: 100,
      flex: 0.15,
      backgroundColor: "#823df2",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 48,
      color: "#051d5f",
    },
    map: {
      backgroundColor: "greenyellow",
      width: "100%",
      //height: 400,
      flex: 0.55,
    },
    search: {
      width: "100%",
      flex: 0.1,
      backgroundColor: "gold",
      justifyContent: "center",
      alignContent: "center",
    },
    text: {
      color: "black",
      fontSize: 20,
      textAlign: "center",
    },
    list: {
      backgroundColor: "white",
      width: "100%",
      flex: 0.1,
      flexGrow: 1,
    },
    item: {
      flexDirection: "row",
      paddingVertical: 10,
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
}

export default MapScreen;
