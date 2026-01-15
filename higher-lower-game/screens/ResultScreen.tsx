import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Vibration } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function ResultScreen({ route, navigation }: any) {
  const { win, target, starting } = route.params;

  useEffect(() => {
    if (!win) {
      Vibration.vibrate([100, 100, 100]);
    }
  }, []);

  return (
    <View style={styles.container}>
      {win && <ConfettiCannon count={150} origin={{ x: 0, y: 0 }} />}

      <Text style={styles.title}>
        {win ? 'Vous avez gagné 🎉' : 'Vous avez perdu 😢'}
      </Text>

      <Text>Starting : {starting}</Text>
      <Text>Target /: {target}</Text>

      <Image
        source={
          win
            ? require('../assets/won.jpg')
            : require('../assets/lose.jpg')
        }
        style={styles.image}
      />

      <Pressable style={styles.restart} onPress={() => navigation.popToTop()}>
        <Text style={{ color: 'white' }}>Restart</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 10 },
  image: { width: 250, height: 250, marginVertical: 20 },
  restart: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
});
