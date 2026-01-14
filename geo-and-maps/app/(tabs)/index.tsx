import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Home() {
  // Coordonnées Cloud Campus
  const cloudCampus = {
    latitude: 48.859071914045316,
    longitude: 2.3730255818749693,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...cloudCampus,
          latitudeDelta: 0.03,  // plus petit = plus zoomé
          longitudeDelta: 0.03,
        }}
      >
        <Marker
          coordinate={cloudCampus}
          title="Cloud Campus"
          description="Cloud Campus : école du développement web"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: {
    alignSelf: 'stretch',
    height: 450,
    margin: 33,
  },
});
