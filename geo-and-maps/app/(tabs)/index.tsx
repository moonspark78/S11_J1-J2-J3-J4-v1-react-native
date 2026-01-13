import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = "YOUR_GOOGLE_API_KEY"; 

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>('Loading...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let locationWatcher: Location.LocationSubscription | undefined; 

    const getLocation = async () => {
      try {
        setLoading(true);

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission refusée');
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setLocation(currentLocation);

        const { latitude, longitude } = currentLocation.coords;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
          setAddress(data.results[0]?.formatted_address || 'Adresse introuvable');
        } else {
          setAddress('Adresse introuvable');
        }

        setLoading(false);

      } catch (error) {
        console.log(error);
        setErrorMsg('Erreur lors de la localisation');
        setLoading(false);
      }
    };

    getLocation();

    return () => {
      if (locationWatcher) locationWatcher.remove(); 
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <>
          <Text style={styles.label}>Adresse : Loading ...</Text>

          <Text style={styles.label}>Latitude :</Text>
          <Text style={styles.value}>{location?.coords.latitude}</Text>

          <Text style={styles.label}>Longitude :</Text>
          <Text style={styles.value}>{location?.coords.longitude}</Text>

        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  value: { fontSize: 16, marginBottom: 5 },
  error: { fontSize: 16, color: 'red', textAlign: 'center' },
});
